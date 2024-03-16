import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from 'prisma/prisma-client';
import { ProfileEntity } from './profile.entity';
import { SpecificEntity } from 'src/specifics/entities/specific.entity';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: $Enums.ROLE })
  role: $Enums.ROLE;

  @ApiProperty({ type: ProfileEntity })
  profile: ProfileEntity;

  @ApiProperty({ type: SpecificEntity, isArray: true })
  specifics: SpecificEntity[];
}
