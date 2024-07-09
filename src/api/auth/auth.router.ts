import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { validateBody } from "../../validator/validateBody";
import { LoginDto, RegisterDto } from "../../types/dto/auth.dto";

export const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/register", validateBody(RegisterDto), authController.register);
authRouter.post("/login", validateBody(LoginDto), authController.login);