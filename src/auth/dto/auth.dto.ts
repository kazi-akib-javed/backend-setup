import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: 'This is user email',
        default: 'mahadiatabassum161710@gmail.com'
    })
    @IsString({message: 'Invalid type of email!'})
    @IsEmail()
    @IsNotEmpty({message: 'Email can not be empty'})
    email: string;

    @ApiProperty({
        description: 'This is user password',
        default: 'aK@123456'
    })
    @IsString({message: 'Invalid type of password!'})
    @IsNotEmpty({message: 'Password can not be empty'})
    password: string;
}
