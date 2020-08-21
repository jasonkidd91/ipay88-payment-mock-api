import { IsString, IsOptional, MaxLength, IsNotEmpty, IsNumber, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus } from "../e-payment.model";

export class PaymentResponseDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty() MerchantCode: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty() PaymentId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty() RefNo: string;

    @IsString()
    @IsNotEmpty()
    @Matches("^(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$")
    @ApiProperty() Amount: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @ApiProperty() Currency: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty() Remark: string;

    @IsString()
    @IsOptional()
    @MaxLength(30)
    @ApiProperty() TransId: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    @ApiProperty() AuthCode: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1)
    @ApiProperty() Status: PaymentStatus;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty() ErrDesc: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty() Signature: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    @ApiProperty() CCName: string;

    @IsString()
    @IsOptional()
    @MaxLength(16)
    @ApiProperty() CCNo: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty() S_bankname: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty() S_country: string;
}