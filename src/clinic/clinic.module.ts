import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { CityService } from 'src/city/city.service';

@Module({
  controllers: [ClinicController],
  providers: [ClinicService, UsersService, PrismaService, CityService],
})
export class ClinicModule {}
