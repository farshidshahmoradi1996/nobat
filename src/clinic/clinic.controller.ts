import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { ClinicEntity } from './entities/clinic.entity';

@ApiTags('Clinic')
@ApiBearerAuth()
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  @Public()
  @ApiSuccessResponse(ClinicEntity, true)
  findAll() {
    return this.clinicService.findAll();
  }

  @Post()
  @ApiSuccessResponse(ClinicEntity)
  @Roles(Role.Doctor)
  createClinic(@Body() clinicDto: CreateClinicDto, @Request() req) {
    return this.clinicService.create(clinicDto, req.user.id);
  }
}
