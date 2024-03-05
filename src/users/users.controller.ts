import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiSuccessResponse } from 'src/shared/decorators/api-success-response.decorator';
import { UserEntityDto } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiSuccessResponse(UserEntityDto)
  getProfile(@Request() req) {
    return this.usersService.findUserById(req.user.id);
  }
}
