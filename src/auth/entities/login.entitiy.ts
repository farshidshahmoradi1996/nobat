import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  tokenType: string;
}
