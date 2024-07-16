import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

const ErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    name: err.name,
    status: err.status,
    message: err.message,
    errors: err.errors,
  });
};

export default ErrorHandler;
