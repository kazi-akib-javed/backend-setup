import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { RedisEnum } from '../enum/redis.enum';

@Global() // Make the module globally available if needed
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_SESSION',
      useFactory: (configService: ConfigService) => {
        return new Redis(configService.get<string>(RedisEnum.REDIS_SESSION));
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_REGISTER',
      useFactory: (configService: ConfigService) => {
        return new Redis(configService.get<string>(RedisEnum.REDIS_REGISTER));
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_PREVENT_DOS_ATT',
      useFactory: (configService: ConfigService) => {
        return new Redis(configService.get<string>(RedisEnum.REDIS_PREVENT_DOS_ATT));
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_TMP_FILE',
      useFactory: (configService: ConfigService) => {
        return new Redis(configService.get<string>(RedisEnum.REDIS_TMP_FILE));
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_SESSION', 'REDIS_REGISTER', 'REDIS_PREVENT_DOS_ATT', 'REDIS_TMP_FILE'], // Export Redis clients for use in other modules
})
export class RedisConfigModule {}
