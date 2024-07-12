import { ValidationError } from "class-validator";

export const parseValidationErrors = (error: ValidationError[]) => {
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