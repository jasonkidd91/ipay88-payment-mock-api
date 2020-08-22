import { Matches, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EnquiryRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty() MerchantCode: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty() RefNo: string;

    @IsString()
    @IsNotEmpty()
    @Matches("^(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$")
    @ApiProperty() Amount: string;
}