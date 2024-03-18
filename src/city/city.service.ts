import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';

import { PrismaService } from 'src/prisma.service';
import { LOCALES } from 'src/locales/en';
import { CityEntity } from './entities/city.entity';
export const CitySelectEntity = { id: true, name: true };
@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    const newCity = await this.prisma.city.create({
      data: { name: createCityDto.name },
      select: CitySelectEntity,
    });

    return newCity;
  }

  async findAll(): Promise<CityEntity[]> {
    const cities = await this.prisma.city.findMany({
      where: { deleted_at: null },
      select: CitySelectEntity,
      orderBy: { id: 'asc' },
    });
    return cities;
  }

  async findCityById(id: number): Promise<CityEntity> {
    const city = await this.prisma.city.findFirst({
      select: CitySelectEntity,
      where: { deleted_at: null, id },
    });
    if (!city) throw new BadRequestException(LOCALES.CITY.CITY_NOT_FOUND);
    return city;
  }
  async remove(id: number) {
    const findCity = await this.findCityById(id);
    if (!findCity) throw new BadRequestException(LOCALES.CITY.NOT_FOUND);
    await this.prisma.city.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return {};
  }
}
