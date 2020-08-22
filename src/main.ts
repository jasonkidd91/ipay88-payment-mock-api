import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addServer(process.env.BASE_URL)
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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port} ...`)
}
bootstrap();
