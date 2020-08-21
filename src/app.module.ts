import { Module } from '@nestjs/common';
import { EPaymentModule } from './e-payment/e-payment.module';

@Module({
  imports: [EPaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
