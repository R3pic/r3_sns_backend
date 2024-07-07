import { Router } from 'express';
import { userService } from './user.service';
import { validateParams } from '../validator/validateParams';
import { GetUserParamsDto } from '../types/dto/user.dto';

export const userController = Router();

/**
 * @swagger
 * /user/{userid}:
 *   get:
 *     summary: Get a user
 *     tags: [User]
 *     responses:
 *      200:
 *       description: OK
 *      400:
 *       description: Bad request
 *      404:
 *       description: Not Found
 */
userController.get('/:userid', validateParams(GetUserParamsDto), userService.getUser);

export default userController;