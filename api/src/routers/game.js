import { Router } from "express";
import { verifyToken } from "../middlewares/verifytoken.js";
import { playGame, getResults } from "../controllers/game.js";

const gameRouter = Router();

gameRouter.use("/", verifyToken);

gameRouter.get("/play", playGame);

gameRouter.get("/results", getResults);

export default gameRouter;
