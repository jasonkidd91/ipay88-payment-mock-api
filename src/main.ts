import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EPaymentModule } from './e-payment/e-payment.module';

async function bootstrap() {
  const logger = new Logger('app');
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
                    .addServer(process.env.BASE_URL)
                    .setTitle('iPay88 Mock API')
                    .setDescription('for simulate iPay88 I/O parameters')
                    .setVersion('1.0')
                    .build();

  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule,
      //EPaymentModule,
    ]
  });
  SwaggerModule.setup('swagger', app, appDocument);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`application listening on port ${port} ...`)
}
bootstrap();
