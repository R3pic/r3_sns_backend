import { validateOrReject, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { parseValidationErrors } from './parseValidationErrors';

export function validateQuery(schema: { new (): any }) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const target = plainToClass(schema, req.query);

    try {
      await validateOrReject(target);
      return next();
    } catch (error: unknown) {
      if (Array.isArray(error) && error.every(err => err instanceof ValidationError)) {
        const validationErrors = parseValidationErrors(error);
        return next(createError(400, { name: 'Bad Request', message: 'Validation Error', errors: validationErrors }));
      }
    }
  };
}