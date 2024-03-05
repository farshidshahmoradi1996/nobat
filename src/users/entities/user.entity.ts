import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from 'prisma/prisma-client';
import { ProfileEntityDto } from './profile.entity';
import { SpecificEntityDto } from './specific.entity';
import { Exclude } from 'class-transformer';

export class UserEntityDto implements User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;

  @ApiProperty({ enum: $Enums.ROLE })
  role: $Enums.ROLE;

  @Exclude()
  password: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  deleted_at: Date;
  @Exclude()
  is_blocked: boolean;
  @Exclude()
  updated_at: Date;

  @ApiProperty()
  profile: ProfileEntityDto;

  @ApiProperty()
  specifics: SpecificEntityDto[];

  constructor({ profile, specifics, ...data }: Partial<UserEntityDto>) {
    Object.assign(this, data);

    if (profile) {
      this.profile = new ProfileEntityDto(profile);
    }

    if (specifics) {
      this.specifics = specifics.map(
        (specific) => new SpecificEntityDto(specific),
      );
    }
  }
}
