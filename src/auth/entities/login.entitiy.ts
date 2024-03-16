import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class LoginAuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  tokenType: string;

  @ApiProperty()
  user: UserEntity;
}
