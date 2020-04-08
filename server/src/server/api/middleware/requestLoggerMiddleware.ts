import { Request, Response, NextFunction } from "express";

export const RequestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  // 4/2/2020, 10:39:06 AM: [1347a8a782381] Request GET - /

  let requestLogObject : any = {
    timestamp: new Date().toISOString(),
    correlationId: (request as any).id,
    action: "request",
    method: request.method,
    path: request.path
  }

  console.info(JSON.stringify(requestLogObject));
  
  next();
};