import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { validateParams } from "../../validator/validateParams";
import { GetUserbyIdParamsDto } from "../../types/dto/user.dto";
import { UserRepository } from "./user.repository";


export const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/:userid", validateParams(GetUserbyIdParamsDto), userController.getUserbyId);