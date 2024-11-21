import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { BaseDto } from '../../../common';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    description: 'This is first name of a user',
    maximum: 50,
    default: 'Mahadia',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Maximum 65 character supported' })
  firstName: string;

  @ApiProperty({
    description: 'This is last name of a user',
    maximum: 50,
    default: 'Tabassum',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Maximum 65 character supported' })
  lastName: string;

  @ApiProperty({
    description: 'This is email of a user',
    maximum: 50,
    default: 'mahadiatabassum161710@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'This is user id of a user',
    maximum: 50,
    default: 'UID-00001',
  })
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({
    description: 'This is password of a user',
    maximum: 50,
    default: 'aK@123456',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/, {
    message: 'Password too weak!',
  })
  password: string;

  @ApiProperty({
    description: 'This is resetpasswordtoken of a user',
  })
  @IsString()
  @IsOptional()
  resetPasswordToken: string;

  @ApiProperty({
    description: 'This is resetpasswordvalidity of a user',
  })
  @IsOptional()
  resetPasswordValidity: Date;

  @ApiProperty({ default: false })
  @IsOptional()
  resetPasswordFlag: boolean;

  @ApiProperty({
    default: 'Jashore, Bangladesh',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    default: '01793596145',
  })
  @IsString()
  @IsOptional()
  phone: string;

//   @ApiProperty()
//   @IsArray()
//   @IsOptional()
//   friend_list: number[];

//   @Type(() => CreateChatDto)
//   senderMessages: CreateChatDto[];

//   @Type(() => CreateChatDto)
//   receiverMessages: CreateChatDto[];
  // @ApiProperty()
  // @IsOptional()
  // photo: Express.Multer.File;
}