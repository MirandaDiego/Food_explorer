import { Router } from "express";
import * as  userController from '../controllers/userController';
import { Auth } from "../middlewares/auth";


const userRouter = Router();

userRouter.get('/', userController.All);
userRouter.post('/register',userController.createUser)
userRouter.delete('/user/:id', userController.deletUser)
userRouter.post('/login', userController.login);

export default userRouter;