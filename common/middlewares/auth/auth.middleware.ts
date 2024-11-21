import { HttpStatus, Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { ErrorDto } from '../../dtos/response/error.dto';
import { ResponseDto } from '../../dtos/response/response.dto';
import { SystemErrorDto } from '../../dtos/response/system-error.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_SESSION') private readonly redisClient: Redis,
  ) {}

  private static toResponse(res: Response, message: string): Response {
    const systemErrorDto = new SystemErrorDto('UNAUTHORIZED', 'Error', message);
    const errorDto = new ErrorDto(null, systemErrorDto);

    const responseDto = new ResponseDto(
      new Date().getTime(),
      HttpStatus.UNAUTHORIZED,
      message,
      errorDto,
      null,
    );

    return res.status(HttpStatus.UNAUTHORIZED).json(responseDto);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Check for authorization token in headers
      const token = req.headers['authorization']?.split('Bearer ')[1];
      if (!token) {
        return AuthMiddleware.toResponse(res, 'Token is not found in requested header!');
      }

      // Retrieve private key for JWT verification
      const privateKEY = this.configService.get<string>('PRIVATE_KEY')?.replace(/\\n/g, '\n');
      if (!privateKEY) {
        throw new Error("Private key for token verification is missing.");
      }

      // Verify the JWT token
      const decodedToken = jwt.verify(token, privateKEY, { algorithms: ['RS256'] }) as jwt.JwtPayload;
      // Calculate expiration time
      const expireTime = decodedToken.exp ? decodedToken.exp - decodedToken.iat : 3600;

      // Set expiration for the token in Redis
      const setExpiry = await this.redisClient.expire(token, expireTime);
      
      if (setExpiry < 0) {
        return AuthMiddleware.toResponse(res, 'Token has expired due to inactivity!');
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error.message);
      return AuthMiddleware.toResponse(res, 'Authorization is denied!');
    }
  }
}
