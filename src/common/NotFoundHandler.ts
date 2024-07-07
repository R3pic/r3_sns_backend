import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url;
    const error = createHttpError(404, { name: 'Not Found', message: `${url} not found` });
    next(error);
}

export default NotFoundHandler;