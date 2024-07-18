import { Router } from 'express';
import { UserController } from './user.controller';
import { validateParams } from '../../validators/validateParams';
import { GetUserbyIdParamsDto } from '../../types/dto/user.dto';

export const userRouter = Router();

userRouter.get('/:userid', validateParams(GetUserbyIdParamsDto), UserController.getUserbyId);
