import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { UserEntityDto } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: number): Promise<UserEntityDto> {
    if (!userId)
      throw new HttpException(
        'User Id can not be null.',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prisma.user.findFirst({
      where: { id: userId, deleted_at: null },
      include: {
        profile: true,
        specifics: { where: { hidden: false, deleted_at: null } },
      },
    });

    return new UserEntityDto(user as any) as any;
  }
}
