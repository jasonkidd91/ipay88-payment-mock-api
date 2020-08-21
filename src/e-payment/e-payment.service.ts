import { Injectable } from '@nestjs/common';
import { PaymentRequestDto, PaymentResponseDto, RequeryPaymentRequestDto } from './dto';
import { RequeryStatus } from './e-payment.model';
import axios from 'axios';

@Injectable()
export class EPaymentService {

    createEntry(request: PaymentRequestDto): Promise<PaymentResponseDto> {
        return axios.post('https://payment.ipay88.com.my/epayment/entry.asp', request);
    }

    requeryEntry(request: RequeryPaymentRequestDto): Promise<RequeryStatus> {
        return axios.post('https://payment.ipay88.com.my/epayment/enquiry.asp', request);
    }
    
}
