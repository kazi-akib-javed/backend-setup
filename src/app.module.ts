import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware, ResponseInterceptor, LoggerMiddleware } from '../common';
import { publicUrls } from './public.url';
import { configTypeorm } from 'common/database/typeorm.config';
import { configEnvironment } from 'common/env-config/env-config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { configRedis } from 'common/redis/redis.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [configTypeorm(),configEnvironment(), configRedis(), AuthModule, UsersModule, ProgramsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
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
