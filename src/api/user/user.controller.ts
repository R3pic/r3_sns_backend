import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

export class UserController {
    constructor(private readonly userService: UserService) { }
    /**
     * @swagger
     * /user/{userid}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 nickname:
     *                   type: string
     *                 userid:
     *                   type: string
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                   example: Bad Request
     *                 status:
     *                   type: number
     *                   example: 400
     *                 message:
     *                   type: string
     *                   example: Validation Error
     *                 errors:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       field:
     *                         type: string
     *                         example: userid
     *                       value:
     *                         type: string
     *                         example: ''
     *                       reasons:
     *                         type: array
     *                         items:
     *                          type: string
     *                          example: 'userid should not be empty'
     *       404:
     *         description: Not Found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                   example: Not Found Error
     *                 status:
     *                   type: number
     *                   example: 404
     *                 message:
     *                   type: string
     *                   example: User does not exist
     */
    getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
        console.log('getUserbyId 컨트롤러 호출됨');
        console.log('userService', this.userService);
        const { userid } = req.params;
        this.userService.getUserbyId(userid)
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((error) => {
                next(error);
            });
    }

    getUserbyEmail = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.params;
        try {
            const user = await this.userService.getUserbyEmail(email);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}