import { HttpStatus, Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';
import { ErrorDto } from '../../dtos/response/error.dto';
import { ResponseDto } from '../../dtos/response/response.dto';
import { SystemErrorDto } from '../../dtos/response/system-error.dto';
import { RedisEnum } from '../../enum/redis.enum';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENTS') private readonly redisClients: Record<string, Redis>,
  ) {}

  // Helper function to generate a response
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

    return res.json(responseDto);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req?.headers['authorization']?.split('Bearer ')[1];

      if (!token) {
        return AuthMiddleware.toResponse(
          res,
          'Token is not found in requested header!',
        );
      }

      let expireTime = this.configService.get(RedisEnum.TOKEN_EXPIRE_TIME);
      let tokenExpireTime = 3600; // Default expiration time

      const privateKEY = this.configService
        .get('PRIVATE_KEY')
        .replace(/\\n/g, '\n');

      // Verify the token using JWT and the private key
      jwt.verify(
        token,
        privateKEY,
        {
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) {
            return AuthMiddleware.toResponse(res, 'Token is invalid!!');
          } else {
            const decodedToken: any = decoded;
            expireTime = decodedToken.exp - decodedToken.iat;
          }
        },
      );

      // Use ioredis to check and set the expiration time for the token
      const redisClient = this.redisClients.REDIS_SESSION;

      await redisClient.expire(token, expireTime).then((res) => {
        tokenExpireTime = res;
      });

      if (tokenExpireTime <= 0) {
        return AuthMiddleware.toResponse(res, 'Expired due to inactivity!');
      }

      next();
    } catch (error) {
      console.log(error);
      return AuthMiddleware.toResponse(res, 'Authorization is denied!');
    }
  }
}
