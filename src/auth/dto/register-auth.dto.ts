import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends LoginAuthDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  first_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  last_name: string;
}
