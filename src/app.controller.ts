import { Controller, Logger, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Root')
@Controller()
export class AppController {

    private logger = new Logger('AppController');

    @Get('/payment/ipay88/ecobotanicp2')
    paymentPage(): string {
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
                ResponseURL*:<br><TEXTAREA name="ResponseURL" cols="80">${process.env.BASE_URL}/response</TEXTAREA><br>
                BackendURL*:<br><TEXTAREA type="text" name="BackendURL" cols="80">${process.env.BASE_URL}/backend</TEXTAREA><br>
                <br>
                <INPUT type="submit" value="Proceed with Payment" name="Submit">
            </FORM>
            </BODY>
            </HTML>
        `;
    }

    @Post('/response')
    response(@Body() response: any) {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
    }

    @Post('/backend')
    backendResponse(@Body() response: any) {
        this.logger.log(`/*****************************************************`);
        this.logger.log(`iPay88 Backend Response: ${JSON.stringify(response)}`);
        this.logger.log(`/*****************************************************`);
    }

}