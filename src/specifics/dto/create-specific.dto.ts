import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSpecificDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  image: string;
}
