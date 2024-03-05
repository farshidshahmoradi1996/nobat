import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Profile } from 'prisma/prisma-client';

export class ProfileEntityDto implements Profile {
  @Exclude()
  id: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @Exclude()
  user_id: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  deleted_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ProfileEntityDto>) {
    Object.assign(this, partial);
  }
}
