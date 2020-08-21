import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EPaymentModule } from './e-payment/e-payment.module';

async function bootstrap() {
  const logger = new Logger('app');
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
                    .setBasePath('ipay88')
                    .setTitle('iPay88 Mock API')
                    .setDescription('for simulate iPay88 I/O parameters')
                    .setVersion('1.0')
                    .build();

  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [EPaymentModule]
  });
<<<<<<< HEAD
  SwaggerModule.setup('swagger', app, appDocument);
=======
  SwaggerModule.setup('/ipay88/api', app, appDocument);
>>>>>>> f590f7291a364ff12f2b93132b26a58ee76dae0f

  const port = process.env.port || 9001;
  await app.listen(port);
  logger.log(`application listening on port ${port} ...`)
}
bootstrap();
