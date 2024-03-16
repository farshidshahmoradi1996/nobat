import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateSpecificDto } from './dto/create-specific.dto';
import { SpecificEntity } from './entities/specific.entity';

@Injectable()
export class SpecificsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const specifics = await this.prisma.specific.findMany({
      where: { deleted_at: null, hidden: false },
      select: { id: true, name: true, image: true },
    });
    return specifics;
  }
  async findById(id: number): Promise<SpecificEntity> {
    const specific = await this.prisma.specific.findFirst({
      where: { deleted_at: null, id },
      select: { id: true, name: true, image: true },
    });
    return specific;
  }

  async createSpecific(specific: CreateSpecificDto): Promise<SpecificEntity> {
    const newSpecific = await this.prisma.specific.create({
      data: { name: specific.name, image: specific.image, hidden: false },
    });

    const savedSpecific = await this.findById(newSpecific.id);
    return savedSpecific;
  }
}
