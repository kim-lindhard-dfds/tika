import { Request, Response, NextFunction } from "express";

export const ResponseLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  // 4/2/2020, 10:39:06 AM: [1347a8a782381] Response GET 200 - /
  console.info(`${new Date().toLocaleString()}: [${(request as any).id}] Response ${request.method} ${response.statusCode} - ${request.path}`);
  
  next();
};