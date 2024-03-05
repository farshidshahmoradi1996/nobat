import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  lastName: string;
}
