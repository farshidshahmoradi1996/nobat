import { ApiProperty } from '@nestjs/swagger';

export class CityEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
