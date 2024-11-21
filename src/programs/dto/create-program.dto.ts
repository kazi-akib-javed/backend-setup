import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "common";

export class CreateProgramDto extends BaseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    university: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    degreeType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requiredDegree: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tuitionFee: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requiredGpa: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    englishLanguageTestScore: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    germanLanguageTestScore: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    greScore: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate({message: "appStartDate type error"})
    @Type(() => Date)
    appStartDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate({message: "appEndDate type error"})
    @Type(() => Date)
    appEndDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    admissionType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    admissionSession: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    courseWebsite: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    applyVia: string;
}
