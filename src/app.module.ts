import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware, LoggerMiddleware } from '../common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { publicUrls } from './public.url';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigService,
    {
      provide: 'REDIS_CLIENTS',
      useClass: Redis,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer
      .apply(AuthMiddleware)
      .exclude(...publicUrls)
      .forRoutes("*");
  }
}
