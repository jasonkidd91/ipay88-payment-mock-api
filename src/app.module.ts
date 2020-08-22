import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EPaymentModule } from './e-payment/e-payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EPaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
