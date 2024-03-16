import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';

import { PrismaService } from 'src/prisma.service';
import { LOCALES } from 'src/locales/en';
import { ClinicEntity } from './entities/clinic.entity';
import { CityService } from 'src/city/city.service';

export const selectClinicEntity = {
  id: true,
  name: true,
  address: true,
  telephone: true,
  city: { select: { id: true, name: true } },
  lat: true,
  lng: true,
};

@Injectable()
export class ClinicService {
  constructor(
    private cityService: CityService,
    private prismaService: PrismaService,
  ) {}

  async create(createClinicDto: CreateClinicDto): Promise<ClinicEntity> {
    const city = await this.cityService.findCityById(createClinicDto.city_id);
    if (!city)
      throw new HttpException(
        LOCALES.CLINIC.CITY_ERROR,
        HttpStatus.BAD_REQUEST,
      );

    const clinic = await this.prismaService.clinic.create({
      data: {
        name: createClinicDto.name,
        address: createClinicDto.address,
        city_id: city.id,
        lat: createClinicDto.lat,
        lng: createClinicDto.lng,
        telephone: createClinicDto.telephone,
      },
      select: selectClinicEntity,
    });
    return clinic;
  }

  async findAll(): Promise<ClinicEntity[]> {
    const clinics = await this.prismaService.clinic.findMany({
      where: { deleted_at: null },
      orderBy: { id: 'asc' },
      select: selectClinicEntity,
    });
    return clinics;
  }
  async findById(id: number): Promise<ClinicEntity> {
    const clinic = await this.prismaService.clinic.findFirst({
      where: { id, deleted_at: null },
      select: selectClinicEntity,
    });
    if (!clinic)
      throw new HttpException(LOCALES.CLINIC.NOT_FOUND, HttpStatus.BAD_REQUEST);
    return clinic;
  }
}
