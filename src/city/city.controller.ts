import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { CityEntity } from './entities/city.entity';
import { ResponseMessage } from 'src/shared/decorators/response.decorator';
import { LOCALES } from 'src/locales/en';

@ApiTags('city')
@Controller('city')
@ApiBearerAuth()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @Public()
  @ApiSuccessResponse(CityEntity, true)
  findAll() {
    return this.cityService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  @ApiSuccessResponse(CityEntity)
  @ResponseMessage(LOCALES.CITY.CITY_SAVED)
  createCity(@Body() cityDto: CreateCityDto) {
    return this.cityService.create(cityDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ResponseMessage(LOCALES.CITY.DELETE)
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
