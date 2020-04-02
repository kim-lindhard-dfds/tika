import { Request, Response, NextFunction } from "express";

import { TopicAlreadyExistsException, ServiceAccountAlreadyExistsException } from "../../wrapper/model/error";

export const RequestError = (
    err : Error,
    request : Request,
    response : Response,
    next: NextFunction
) => {
    console.error(err);

    response.setHeader('Content-Type', 'application/json');

    switch (err.name.valueOf()) {
        case new TopicAlreadyExistsException().name.valueOf():
            response.status(409).json({errName: err.name, errMessage: err.message});
            break;
        case new ServiceAccountAlreadyExistsException().name.valueOf():
            response.status(409).json({errName: err.name, errMessage: err.message});
            break;
        default:
            response.status(500).json({errName: err.name, errMessage: err.message});
    }

    next();
};