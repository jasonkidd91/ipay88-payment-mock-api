import { IsString, IsOptional, MaxLength, IsNotEmpty, IsNumber, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaymentResponseDto {
    @ApiProperty() MerchantCode: string;
    @ApiProperty() PaymentId: number;
    @ApiProperty() RefNo: string;
    @ApiProperty() Amount: string;
    @ApiProperty() Currency: string;
    @ApiProperty() Remark: string;
    @ApiProperty() TransId: string;
    @ApiProperty() AuthCode: string;
    @ApiProperty() Status: string;
    @ApiProperty() ErrDesc: string;
    @ApiProperty() Signature: string;
    @ApiProperty() CCName: string;
    @ApiProperty() CCNo: string;
    @ApiProperty() S_bankname: string;
    @ApiProperty() S_country: string;
}