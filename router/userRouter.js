import express from "express";
import { loginUser, saveUser } from "../controles/usercontrol.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",loginUser)//samaayen email password ynne security pradana kragena ewa ywaddi me post req ekami danne

export default userRouter;