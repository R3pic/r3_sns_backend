import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = createHttpError(404, { name: 'Not Found', message: 'The requested resource could not be found' });
    next(error);
}

export default NotFoundHandler;