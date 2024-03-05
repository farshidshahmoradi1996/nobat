import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';

import { ResponseMessage } from 'src/shared/decorators/response.decorator';
import { LOCALES } from 'src/locales/en';
import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { LoginAuthResponseDto } from './entities/login.entitiy';
import { UserEntityDto } from 'src/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSuccessResponse(LoginAuthResponseDto)
  @ResponseMessage(LOCALES.AUTH.AUTH_SUCCESSFULLY)
  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginAuthResponseDto> {
    return this.authService.login(loginAuthDto);
  }

  @ApiSuccessResponse(UserEntityDto)
  @Post('register')
  @Public()
  @HttpCode(200)
  register(@Body() registerUserDto: RegisterAuthDto): Promise<UserEntityDto> {
    return this.authService.registerUser(registerUserDto);
  }
}
