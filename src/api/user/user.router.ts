import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { validateParams } from "../../validator/validateParams";
import { GetUserbyIdParamsDto } from "../../types/dto/user.dto";


export const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/:userid", validateParams(GetUserbyIdParamsDto), userController.getUserbyId);