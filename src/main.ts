import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { doubleCsrf } from 'csrf-csrf';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT");
  const swaggerUser = configService.get<string>("SWAGGER_USER");
  const swaggerPassword = configService.get<string>("SWAGGER_PASSWORD");
  const env = configService.get<string>("NODE_ENV");

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
      exceptionFactory: (errors) => {
        // Customize error messages
        return new BadRequestException(
          errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          }))
        );
      },
    }),
  );

  //Swagger configuration for development environment only
  if(env==='dev'){
    const basicAuth = require('express-basic-auth');
    app.use(
      ['/apidoc'],
      basicAuth({
        challenge: true,
        users: {
          [swaggerUser]: swaggerPassword,
        },
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('NutritionAI')
      .setDescription('The Nutrition API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidoc', app, documentFactory);
  }
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
