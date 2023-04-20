import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import errors from "@/errors/index.js";

export function schemaValidation(schema: Schema) {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messageError = error.details.map((detail) => detail.message);
      throw errors.validationError(messageError);
    }

    next();
  };
}
