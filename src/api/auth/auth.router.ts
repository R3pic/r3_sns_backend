import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { validateBody } from "../../validators/validateBody";
import { LoginDto, RegisterDto } from "../../types/dto/auth.dto";
import { authMiddleware } from "../../passport/authMiddleware";

export const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/register", validateBody(RegisterDto), authController.register);
authRouter.post("/login", validateBody(LoginDto), authController.login);
authRouter.delete("/withdrawal", authMiddleware, authController.withdrawal);

authRouter.post("/refresh", authController.refresh);
authRouter.get("/check", authMiddleware, authController.check);