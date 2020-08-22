import { Controller, Post, Body, ValidationPipe, Logger, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RequeryStatus } from './e-payment.model';
import { EPaymentService } from './e-payment.service';
import { PaymentRequestDto, PaymentResponseDto, RequeryPaymentRequestDto } from './dto';

@ApiTags('ePayment')
@Controller('ePayment')
export class EPaymentController {

    private logger = new Logger('ePaymentController');

    constructor(private readonly ePaymentService: EPaymentService) {}

    @Get("/test-payment")
    testPaymentPage(): string {
        return `
            <HTML>
            <HEAD>
            <STYLE>
                p input { position: absolute; left: 150px; }
            </STYLE>
            </HEAD>
            <BODY>
            <FORM method="post" name="ePayment" action="https://payment.ipay88.com.my/ePayment/entry.asp">
                <p>Merchant Code*:  <INPUT type="text" name="MerchantCode"  value="${process.env.MERCHANT_CODE}"></p>
                <p>PaymentId:       <INPUT type="text" name="PaymentId"     value="6"></p>
                <p>RefNo*:          <INPUT type="text" name="RefNo"         value="A00000001"></p>
                <p>Amount*:         <INPUT type="text" name="Amount"        value="1.00"></p>
                <p>Currency*:       <INPUT type="text" name="Currency"      value="MYR"></p>
                <p>ProdDesc*:       <INPUT type="text" name="ProdDesc"      value="Photo Print"></p>
                <p>UserName*:       <INPUT type="text" name="UserName"      value="John Tan"></p>
                <p>UserEmail*:      <INPUT type="text" name="UserEmail"     value="john@hotmail.com"></p>
                <p>UserContact*:    <INPUT type="text" name="UserContact"   value="0126500100"></p>
                <p>Remark:          <INPUT type="text" name="Remark"        value=""></p>
                <p>Lang:            <INPUT type="text" name="Lang"          value="UTF-8"></p>
                <p>SignatureType*:  <INPUT type="text" name="SignatureType" value="SHA256"></p>
                <p>Signature*:      <INPUT type="text" name="Signature"     value="748b113d075c98ae4b6ecc6b0070fd645039d78d05dfd79be0586e338f09e9b2"></p>
                ResponseURL*:<br><TEXTAREA name="ResponseURL" cols="80">${process.env.BASE_URL}/ePayment/response</TEXTAREA><br>
                BackendURL*:<br><TEXTAREA type="text" name="BackendURL" cols="80">${process.env.BASE_URL}/ePayment/backend_response</TEXTAREA><br>
                <br>
                <INPUT type="submit" value="Proceed with Payment" name="Submit">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    @Post('/entry.asp')
    @ApiResponse({status: 200, description: 'Response from iPay88', type: PaymentResponseDto})
    async createEntry(@Body() request: PaymentRequestDto): Promise<PaymentResponseDto> {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`Create Entry Request: ${JSON.stringify(request)}`);
        const response = await this.ePaymentService.createEntry(request);
        this.logger.log(`Create Entry Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
        return response;
    }

    @Post('/enquiry.asp')
    @ApiResponse({status: 200, description: 'Response from iPay88', type: String })
    async requeryEntry(@Body(ValidationPipe) request: RequeryPaymentRequestDto): Promise<RequeryStatus> {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`Requery Entry Request: ${JSON.stringify(request)}`);
        const response = await this.ePaymentService.requeryEntry(request);
        this.logger.log(`Requery Entry Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
        return response;
    }

    @Post('/response')
    response(@Body() response: any) {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Frontend Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
    }

    @Post('/backend_response')
    backendResponse(@Body() response: any) {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Backend Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
    }

}
