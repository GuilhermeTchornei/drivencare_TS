import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export default function handleApplicationErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    switch (err.name)
    {
        case "UnprocessableContent":
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message });
        case "DuplicatedData":
            return res.status(httpStatus.CONFLICT).send({ message: err.message });
        case "InternalError":
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
        case "invalidCredentials":
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
        case "Unauthorized":
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
        case "BadRequest":
            return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
        case "NotFound":
            return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
        default:
            return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
    }
}