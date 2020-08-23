import { Controller, Logger, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { PaymentRequestDto, PaymentResponseDto, EnquiryRequestDto } from "./dto";
import { config } from './config/configuration';
import axios, { AxiosPromise } from 'axios';

@ApiTags('Application')
@Controller()
export class AppController {

    private logger = new Logger('AppController');

    @Get('/payment/ipay88/ecobotanicp2')
    @ApiResponse({ status: 200, description: 'iPay88 Testing Entry Form', type: String })
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
                <p>MerchantCode*:  <INPUT type="text" name="MerchantCode"  value="${config.MERCHANT_CODE}"></p>
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
                ResponseURL*:   <br><TEXTAREA name="ResponseURL" cols="80">${config.BASE_URL}/response</TEXTAREA><br>
                BackendURL*:    <br><TEXTAREA type="text" name="BackendURL" cols="80">${config.BASE_URL}/backend</TEXTAREA><br>
                <br>
                /** Chain Promise to Create Transaction into DB then proceed submit to iPayy **/
                <INPUT type="submit" value="Proceed with Payment" name="Submit">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    @Get('/payment/ipay88/enquiry')
    @ApiResponse({ status: 200, description: 'iPay88 Testing Enquiry Form', type: String })
    enquiryForm(): string {
        return `
            <HTML>
            <HEAD>
            <STYLE>
                p input { position: absolute; left: 150px; }
            </STYLE>
            </HEAD>
            <BODY>
            <FORM method="post" name="ePayment" action="/enquiry">
                <p>MerchantCode*:   <INPUT type="text" name="MerchantCode"  value="${config.MERCHANT_CODE}"></p>
                <p>RefNo*:          <INPUT type="text" name="RefNo"         value="A00000001"></p>
                <p>Amount*:         <INPUT type="text" name="Amount"        value="1.00"></p>
                <br>
                <INPUT type="submit" value="Enquiry Payment">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    // @Post('/payment/ipay88/ecobotanicp2')
    // @ApiResponse({ status: 200, description: 'iPay88 New Payment Entry', type: String })
    // newTransaction(@Body() request: PaymentRequestDto): AxiosPromise<any> {
    //     /** Create Transaction into Database then call iPay88 */
    //     this.logger.log(`iPay88 New Payment Entry:\n${JSON.stringify(request,null,2)}`);
    //     this.logger.log('asd')
    //     return axios.post<any>('https://payment.ipay88.com.my/ePayment/entry.asp', JSON.stringify(request));
    // }
    
    @Post('/enquiry')
    @ApiResponse({ status: 200, description: 'iPay88 Enquiry Payment Status', type: String })
    async enquiry(@Body() request: EnquiryRequestDto): Promise<string> {
        this.logger.log(JSON.stringify(request))
        this.logger.log(JSON.stringify({...request}))
        const data = {
            MerchantCode: 'M27522',
            RefNo: 'A00000001',
            Amount: 1.00
        }
        const response = await axios.post<string>('https://payment.ipay88.com.my/epayment/enquiry.asp', data);
        const status = response.data;
        this.logger.log(`iPay88 Enquiry ${request.RefNo} Status: ${status}`);
        return status;
    }

    @Post('/response')
    @ApiResponse({ status: 200, description: 'iPay88 Response', type: PaymentResponseDto })
    response(@Body() response: PaymentResponseDto): PaymentResponseDto {
        /** Query from DB, Perform Checking, Enquiry & Update */
        this.logger.log(`iPay88 Response:\n${JSON.stringify(response,null,2)}`);
        return response;
    }

    @Post('/backend')
    @ApiResponse({ status: 200, description: 'iPay88 Backend Response', type: PaymentResponseDto })
    backendResponse(@Body() response: PaymentResponseDto): PaymentResponseDto {
        /** Query from DB, Perform Checking, Enquiry & Update */
        this.logger.log(`iPay88 Backend Response:\n${JSON.stringify(response,null,2)}`);
        return response;
    }

}