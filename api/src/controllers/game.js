import User from "../models/user.js";
import Pastry from "../models/pastries.js";

export const playGame = async (req, res) => {
  let user = await User.findOne({ email: req.user.email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  if (user && user.nbr_games >= 3) {
    return res.status(200).json({
      message: "Nombre maximum de parties atteint",
      type: "PERDU",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        nbr_games: user.nbr_games,
        winner: user.winner,
      },
      dice_table: [],
    });
  }

  if (user && user.winner.length > 0) {
    return res.status(200).json({
      message: "Vous avez deja gagné des pâtisseries !",
      type: "GAGNE",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        nbr_games: user.nbr_games,
        winner: user.winner,
      },
      dice_table: [],
    });
  }

  user.nbr_games += 1;

  let dice_table = [];

  for (let i = 0; i < 5; i++) {
    dice_table.push(Math.floor(Math.random() * 6) + 1);
  }

  if (dice_table.every((val) => val === dice_table[0])) {
    const userdata = await attribuatePastries(user, 3, "YAM'S");
    if (userdata) {
      return res.status(200).json({
        message: "Vous avez gagné 3 pâtisseries !",
        description: "(5/5 dés identiques 🎲🎲🎲🎲🎲)",
        user: userdata,
        dice_table: dice_table,
        type: "YAM'S",
      });
    }
  }

  if (detectForOfFive(dice_table)) {
    const userdata = await attribuatePastries(user, 2, "CARRE");
    if (userdata) {
      return res.status(200).json({
        message: "Vous avez gagné 2 pâtisseries !",
        description: "(4/5 dés identiques 🎲🎲🎲🎲)",
        user: userdata,
        dice_table: dice_table,
        type: "CARRE",
      });
    }
  }

  if (detectTwoPairs(dice_table)) {
    const userdata = await attribuatePastries(user, 1, "DOUBLE");
    if (userdata) {
      return res.status(200).json({
        message: "Vous avez gagné 1 pâtisserie !",
        description: "(2 paires de dés identiques 🎲🎲 + 🎲🎲)",
        user: userdata,
        dice_table: dice_table,
        type: "DOUBLE",
      });
    }
  }

  await user.save();

  return res.status(200).json({
    message: "RETENTEZ VOTRE CHANCE",
    type: "PERDU",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      nbr_games: user.nbr_games,
      winner: user.winner,
    },
    dice_table: dice_table,
  });
};

const detectForOfFive = (dice) => {
  const identicalValues = dice.filter((val) => val === dice[0]);
  if (identicalValues.length === 4) {
    return true;
  } else {
    return false;
  }
};
const detectTwoPairs = (dice) => {
  const occurrences = {};

  for (let die of dice) {
    occurrences[die] = (occurrences[die] || 0) + 1;
  }

  let pairCount = 0;
  for (let die in occurrences) {
    if (occurrences[die] >= 2) {
      pairCount++;
    }
  }

  return pairCount >= 2;
};

const attribuatePastries = async (user, limit, type) => {
  const pastries = await Pastry.aggregate([
    { $match: { stock: { $gt: 0 } } },
    { $sample: { size: limit } },
  ]);

  let winnerData = [];

  for (let pastry of pastries) {
    let data_winner = {
      name: pastry.name,
      image: pastry.image,
      date: new Date().toLocaleDateString("fr-FR"),
      time: new Date().toLocaleTimeString("fr-FR"),
    };
    winnerData.push(data_winner);
    await Pastry.findOneAndUpdate(
      { _id: pastry._id },
      { $inc: { stock: -1, quantityWon: 1 } }
    );
  }
  user.winner = winnerData;
  await user.save();

  const data = {
    id: user._id,
    email: user.email,
    username: user.username,
    nbr_games: user.nbr_games,
    winner: user.winner,
    type: type,
  };

  return data;
};
