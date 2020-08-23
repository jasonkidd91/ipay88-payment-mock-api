import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config/configuration';

async function bootstrap() {
  const isProduction = config.PRODUCTION;
  const port = config.PORT;
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    logger: isProduction ? ['log', 'warn', 'error'] : undefined
  });

  if (!isProduction) {
    const options = new DocumentBuilder()
      .addServer(config.BASE_URL)
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
  logger.log(`Application listening on port ${port}...`)
}
bootstrap();
