import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

// Fonction pour générer un token JWT
const generateToken = (user) => {
  return jsonwebtoken.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY || "TOKEN_KEY",
    { expiresIn: "1h" }
  );
};

// Fonction pour créer un objet contenant les données de l'utilisateur
const createUserdata = (user, token) => {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token: token,
    nbr_games: user.nbr_games,
    winner: user.winner,
    role: user.role,
  };
};

// Fonction pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  // Vérification des données entrées par l'utilisateur
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }

  // Hashage du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Création du nouvel utilisateur
  const user = new User({
    email,
    username,
    password: hashedPassword,
  });

  try {
    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();

    // Génération du token
    const token = generateToken(user);
    user.token = token;
    user.password = undefined;

    // Création de l'objet contenant les données de l'utilisateur
    const userdatas = createUserdata(user, token);

    res.status(201).json(userdatas);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Cet email ou ce nom d'utilisateur est déjà utilisé",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Vérification des données entrées par l'utilisateur
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }

  // Recherche de l'utilisateur dans la base de données
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Génération du token
  const token = generateToken(user);
  user.token = token;
  user.password = undefined;

  const userdatas = createUserdata(user, token);

  res.status(200).json(userdatas);
};
