import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  password: string;
}
