import { Request, Response, NextFunction } from "express";

export const RequestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  // 4/2/2020, 10:39:06 AM: [1347a8a782381] Request GET - /
  console.info(`${new Date().toLocaleString()}: [${(request as any).id}] Request ${request.method} - ${request.path}`);
  
  next();
};