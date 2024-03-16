import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { UserEntity } from './entities/user.entity';
import { SetUserClinicDto } from './dto/set-user-clinic.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiSuccessResponse(UserEntity)
  getProfile(@Request() req) {
    return this.usersService.findUserById(req.user.id);
  }

  @Post('set_clinic')
  @Roles(Role.Admin)
  @ApiSuccessResponse(UserEntity)
  setUserClinic(@Body() setUserClinicDto: SetUserClinicDto) {
    return this.usersService.setUserClinic(setUserClinicDto);
  }
}
