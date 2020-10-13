import { HTTPException } from "../../core/exceptions/http-exception.model";
import { Request, Response, NextFunction } from "express";

const DEFAULT_ERROR_MSG = `It's not you. It's us. We're having some problems.`

export const errorHandler = (
    error: HTTPException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || 500;
    const message = error.message || DEFAULT_ERROR_MSG;
    response.status(status).send(message);
};