import User from "../models/user.js";

export const getResults = async (req, res) => {
  const userStored = req.user;
  const user = await User.findOne({ email: userStored.email });

  const usersWithWinner = await User.find({ winner: { $ne: [] } });

  let results = [];

  for (const usr of usersWithWinner) {
    results.push({
      id: usr._id,
      email: usr.email,
      username: usr.username,
      nbr_games: usr.nbr_games,
      winner: usr.winner,
    });
  }
  res.status(200).json(results);
};
