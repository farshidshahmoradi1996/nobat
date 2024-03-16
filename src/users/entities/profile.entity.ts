import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}
