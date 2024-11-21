import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-agent") || "";

    response.on("finish", () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get("content-length");
      const logMessage = `${method} ${originalUrl} ${statusCode} - ${statusMessage} - ${contentLength} - ${userAgent} ${ip}`;

      if (statusCode >= 200 && statusCode < 400) {
        this.logger.log(logMessage);
      } else {
        this.logger.error(logMessage);
      }
    });

    next();
  }
}
