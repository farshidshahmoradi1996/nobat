import { ApiProperty } from '@nestjs/swagger';
import { Specific } from 'prisma/prisma-client';

export class SpecificEntityDto implements Specific {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  hidden: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(partial: Partial<SpecificEntityDto>) {
    Object.assign(this, partial);
  }
}
