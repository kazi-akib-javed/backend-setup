import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../../common';
import { ResponseService } from '../../common/services/response.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}
  
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Login is successful',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() authDto: AuthDto) {
    const payload = this.authService.login(authDto);
    return this.responseService.toResponse<UserResponseDto>(
			HttpStatus.OK,
			"Login is successful",
			payload
		);
  }
  
  @ApiBearerAuth()
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Logout is successful',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    const payload = this.authService.loginOut();
    return this.responseService.toResponse<boolean>(
			HttpStatus.OK,
			"Logout is successful",
			payload
		);
  }
}