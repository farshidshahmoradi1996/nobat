import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClinicDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  city_id: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsOptional()
  telephone: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  lat: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  lng: number;
}
