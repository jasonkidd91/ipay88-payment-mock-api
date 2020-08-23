import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config/configuration';

async function bootstrap() {
  const { APP_NAME: appName, BASE_URL: baseUrl, PORT: port, PRODUCTION: isProduction } = config;
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule, {
    logger: isProduction ? ['log', 'warn', 'error'] : undefined
  });

  if (!isProduction) {
    const options = new DocumentBuilder()
      .addServer(baseUrl)
      .setTitle('iPay88 Testing API')
      .setDescription('for simulate iPay88 payment flow')
      .setVersion('1.0')
      .build();

    const appDocument = SwaggerModule
      .createDocument(app, options, {
        include: [
          AppModule,
        ]
      });

    SwaggerModule.setup('swagger', app, appDocument);
  }

  await app.listen(port);
  logger.log(`Application ${appName} listening on port ${port}...`)
}
bootstrap();
