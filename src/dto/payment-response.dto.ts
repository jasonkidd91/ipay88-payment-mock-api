import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaymentResponseDto {
    @ApiProperty() MerchantCode: string;
    @ApiProperty() PaymentId: number;
    @ApiProperty() RefNo: string;
    @ApiProperty() Amount: string;
    @ApiProperty() Currency: string;
    @ApiPropertyOptional() Remark: string;
    @ApiPropertyOptional() TransId: string;
    @ApiPropertyOptional() AuthCode: string;
    @ApiProperty() Status: string;
    @ApiPropertyOptional() ErrDesc: string;
    @ApiProperty() Signature: string;
    @ApiPropertyOptional() CCName: string;
    @ApiPropertyOptional() CCNo: string;
    @ApiPropertyOptional() S_bankname: string;
    @ApiPropertyOptional() S_country: string;
}