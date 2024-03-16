import { Module } from '@nestjs/common';
import { SpecificsService } from './specifics.service';
import { SpecificsController } from './specifics.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpecificsController],
  providers: [SpecificsService, PrismaService],
})
export class SpecificsModule {}
