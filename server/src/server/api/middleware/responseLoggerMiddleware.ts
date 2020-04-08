import { Request, Response, NextFunction } from "express";

export const ResponseLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  // 4/2/2020, 10:39:06 AM: [1347a8a782381] Response GET 200 - /

  response.on('finish', () => {
    let responseLogObject : any = {
      timestamp: new Date().toISOString(),
      correlationId: (request as any).id,
      action: "response",
      method: request.method,
      path: request.path,
      statusCode: response.statusCode
    }
  
    console.info(JSON.stringify(responseLogObject));
  })

  next();
};