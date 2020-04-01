import { Request, Response, NextFunction } from "express";

export const RequestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  console.info(`${request.method} ${request.path}`);
  
  next();
};