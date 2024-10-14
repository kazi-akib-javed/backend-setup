import { Global, Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis, { Redis as RedisClient } from 'ioredis';

import { RedisEnum } from '../enum/redis.enum';

@Global()
@Module({
  imports: [ConfigModule],
})
export class RedisConfigModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RedisConfigModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'REDIS_CLIENTS',
          useFactory: (configService: ConfigService) => {
            const clients = {
              REDIS_SESSION: new Redis(configService.get(RedisEnum.REDIS_SESSION)),
              REDIS_REGISTER: new Redis(configService.get(RedisEnum.REDIS_REGISTER)),
              REDIS_PREVENT_DOS_ATT: new Redis(configService.get(RedisEnum.REDIS_PREVENT_DOS_ATT)),
              REDIS_TMP_FILE: new Redis(configService.get(RedisEnum.REDIS_TMP_FILE)),
            };
            return clients;
          },
          inject: [ConfigService],
        },
      ],
      exports: ['REDIS_CLIENTS'],
    };
  }
}
