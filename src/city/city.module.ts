import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService],
  exports: [CityService],
})
export class CityModule {}
