import { ApiProperty } from '@nestjs/swagger';

export class SpecificEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}
