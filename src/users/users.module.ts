import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { ClinicService } from 'src/clinic/clinic.service';
import { CityService } from 'src/city/city.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ClinicService, CityService],
  exports: [UsersService],
})
export class UsersModule {}
