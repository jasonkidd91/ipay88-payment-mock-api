import { IsString, IsNotEmpty, IsNumber, MaxLength, Matches, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LangType } from '../e-payment.model';


export class PaymentRequestDto {

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
    //@Matches("^(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})$")
    @ApiProperty() Amount: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @ApiProperty() Currency: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty() ProdDesc: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty() UserName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty() UserEmail: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty() UserContact: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    @ApiProperty() Remark: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    @ApiProperty() Lang: LangType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @ApiProperty() SignatureType: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty() Signature: string;

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty() ResponseURL: string;

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty() BackendURL: string;
}