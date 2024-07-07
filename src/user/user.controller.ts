import { Router } from 'express';
import { UserService } from './user.service';
import { validateParams } from '../validator/validateParams';
import { GetUserParamsDto } from '../types/dto/user.dto';

const userService = new UserService();
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
userController.get('/:userid', validateParams(GetUserParamsDto), async (req, res, next) => {
    const { userid } = req.params;
    try {
        const user = await userService.getUser(userid);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default userController;