import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EPaymentModule } from './e-payment/e-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EPaymentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
