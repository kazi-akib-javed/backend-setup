import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DtoValidationPipe, ResponseService, UserResponseDto } from '../../common';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly responseService: ResponseService) {}

  @Post('create')
  create(@Body(new DtoValidationPipe({skipMissingProperties: false ,whitelist: true, forbidNonWhitelisted: true})) createUserDto: CreateUserDto) {
    const payload =  this.usersService.create(createUserDto);
    return this.responseService.toResponse(
			HttpStatus.OK,
			"Request is successful",
			payload
		);
  }

  @ApiBearerAuth()
  @Get()
  find() {
    const payload = this.usersService.find();
    return this.responseService.toResponse(HttpStatus.OK,"Request is successful", payload);
  }
}