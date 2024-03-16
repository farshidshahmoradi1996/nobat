import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecificsService } from './specifics.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { SpecificEntity } from './entities/specific.entity';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { CreateSpecificDto } from './dto/create-specific.dto';
import { ResponseMessage } from 'src/shared/decorators/response.decorator';
import { LOCALES } from 'src/locales/en';

@ApiTags('specifics')
@ApiBearerAuth()
@Controller('specifics')
export class SpecificsController {
  constructor(private readonly specificsService: SpecificsService) {}

  @Get()
  @Public()
  @ApiSuccessResponse(SpecificEntity, true)
  findAll() {
    return this.specificsService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  @ApiSuccessResponse(SpecificEntity)
  @ResponseMessage(LOCALES.SPECIFIC.CREATE)
  createSpecific(@Body() specificBody: CreateSpecificDto) {
    return this.specificsService.createSpecific(specificBody);
  }
}
