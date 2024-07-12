import { validateOrReject, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

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

const parseValidationErrors = (error: ValidationError[]) => {
  return error.map((err: ValidationError) => {
    if (err.constraints) {
      const messages = Object.values(err.constraints);
      return {
        field: err.property,
        value: err.value,
        reasons: messages,
      };
    }
  });
};
