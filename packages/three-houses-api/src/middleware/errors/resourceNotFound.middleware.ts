import { Request, Response, NextFunction } from "express";
const DEFAULT_404_MSG = 'Resource not found.';

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const route = request.path.toString();
    const message = `${DEFAULT_404_MSG} ${route} is not a valid resource.`;
    response.status(404).send(message);
};
