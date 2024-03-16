import { ApiProperty } from '@nestjs/swagger';
import { CityEntity } from 'src/city/entities/city.entity';

export class ClinicEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  telephone: string;
  @ApiProperty()
  city: CityEntity;
  @ApiProperty()
  lat: number;
  @ApiProperty()
  lng: number;
}
