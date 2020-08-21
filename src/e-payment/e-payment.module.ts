import { Module } from '@nestjs/common';
import { EPaymentController } from './e-payment.controller';
import { EPaymentService } from './e-payment.service';

@Module({
  controllers: [EPaymentController],
  providers: [EPaymentService]
})
export class EPaymentModule {}
