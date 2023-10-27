import { Router } from "express";
import * as oderController from '../controllers/oderController';
import { Auth } from "../middlewares/auth";

const oderRouter = Router();

oderRouter.get('/', oderController.All)

export default oderRouter;