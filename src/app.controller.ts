import { Controller, Logger, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { PaymentResponseDto } from "./dto";

@ApiTags('Application')
@Controller()
export class AppController {

    private logger = new Logger('AppController');

    @Get('/payment/ipay88/ecobotanicp2')
    entryForm(): string {
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
                <p>PaymentId:       <INPUT type="text" name="PaymentId"     value=""></p>
                <p>RefNo*:          <INPUT type="text" name="RefNo"         value="A00000001"></p>
                <p>Amount*:         <INPUT type="text" name="Amount"        value="1.00"></p>
                <p>Currency*:       <INPUT type="text" name="Currency"      value="MYR"></p>
                <p>ProdDesc*:       <INPUT type="text" name="ProdDesc"      value="SBO Booking"></p>
                <p>UserName*:       <INPUT type="text" name="UserName"      value="John Doe"></p>
                <p>UserEmail*:      <INPUT type="text" name="UserEmail"     value="john@hotmail.com"></p>
                <p>UserContact*:    <INPUT type="text" name="UserContact"   value="0126500100"></p>
                <p>Remark:          <INPUT type="text" name="Remark"        value=""></p>
                <p>Lang:            <INPUT type="text" name="Lang"          value="UTF-8"></p>
                <p>SignatureType*:  <INPUT type="text" name="SignatureType" value="SHA256"></p>
                <p>Signature*:      <INPUT type="text" name="Signature"     value="748b113d075c98ae4b6ecc6b0070fd645039d78d05dfd79be0586e338f09e9b2"></p>
                ResponseURL*:<br><TEXTAREA name="ResponseURL" cols="80">${process.env.BASE_URL}/response</TEXTAREA><br>
                BackendURL*:<br><TEXTAREA type="text" name="BackendURL" cols="80">${process.env.BASE_URL}/backend</TEXTAREA><br>
                <br>
                <INPUT type="submit" value="Proceed with Payment" name="Submit">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    @Get('/payment/ipay88/enquiry')
    enquiryForm(): string {
        return `
            <HTML>
            <HEAD>
            <STYLE>
                p input { position: absolute; left: 150px; }
            </STYLE>
            </HEAD>
            <BODY>
            <FORM method="post" name="ePayment" action="https://payment.ipay88.com.my/epayment/enquiry.asp">
                <p>Merchant Code*:  <INPUT type="text" name="MerchantCode"  value="${process.env.MERCHANT_CODE}"></p>
                <p>RefNo*:          <INPUT type="text" name="RefNo"         value="A00000001"></p>
                <p>Amount*:         <INPUT type="text" name="Amount"        value="1.00"></p>
                <br>
                <INPUT type="submit" value="Enquiry Payment" name="Submit">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    @Post('/response')
    @ApiResponse({ status: 200, description: 'iPay88 Response', type: PaymentResponseDto })
    response(@Body() response: PaymentResponseDto): PaymentResponseDto {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Response:\n${JSON.stringify(response,null,2)}`);
        this.logger.log(`/*****************************************************`);
        return response;
    }

    @Post('/backend')
    @ApiResponse({ status: 200, description: 'iPay88 Backend Response', type: PaymentResponseDto })
    backendResponse(@Body() response: PaymentResponseDto): PaymentResponseDto {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Backend Response:\n${JSON.stringify(response,null,2)}`);
        this.logger.log(`/*****************************************************`);
        return response;
    }

}