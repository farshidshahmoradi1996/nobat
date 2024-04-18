import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { UserEntity } from './entities/user.entity';
import { SetUserClinicDto } from './dto/set-user-clinic.dto';
import { ClinicService, selectClinicEntity } from 'src/clinic/clinic.service';
import { LOCALES } from 'src/locales/en';

export const userSelectEntity = {
  id: true,
  username: true,
  role: true,
  profile: {
    where: { deleted_at: null },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  },
  specifics: {
    where: { hidden: false, deleted_at: null },
    select: { id: true, name: true, image: true },
  },
  clinic: { select: selectClinicEntity, where: { deleted_at: null } },
};
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ClinicService))
    private clinicService: ClinicService,
  ) {}

  async findUserById(userId: number): Promise<UserEntity> {
    if (!userId) throw new BadRequestException('User Id can not be null');
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deleted_at: null },
      select: userSelectEntity,
    });

    return user;
  }

  async setUserClinic(setUserClinicDto: SetUserClinicDto) {
    const user = await this.findUserById(setUserClinicDto.user_id);
    if (!user) throw new BadRequestException(LOCALES.USER.NOT_FOUND);

    if (user.role !== 'DOCTOR')
      throw new BadRequestException(LOCALES.USER.NOT_DOCTOR);

    const clinic = await this.clinicService.findById(
      setUserClinicDto.clinic_id,
    );
    if (!clinic) throw new BadRequestException(LOCALES.CLINIC.NOT_FOUND);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { clinic_id: clinic.id },
    });
    return {};
  }
}
