import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser, IAuthUser } from '@authentication/index';

import * as D from '../dto/Role.dto';
import { RoleService } from '../service';

@ApiTags('Role')
@ApiBearerAuth()
@Controller()
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Auth('DEFAULT')
  @Post()
  @ApiOperation({ summary: 'Create Role' })
  create(@AuthUser() auth: IAuthUser, @Body() body: D.CreateBody) {
    return this.service.create(auth, body);
  }

  @Auth('DEFAULT')
  @Get()
  @ApiOperation({ summary: 'Fetch Role list' })
  list(@Query() query: D.ListQuery) {
    return this.service.list(query);
  }

  @Auth('DEFAULT')
  @Get(':id')
  @ApiOperation({ summary: 'Fetch Role detail' })
  detail(@Param() { id }: D.Param) {
    return this.service.detail(id);
  }

  @Auth('DEFAULT')
  @Put(':id')
  @ApiOperation({ summary: 'Update Role' })
  update(@AuthUser() auth: IAuthUser, @Param() { id }: D.Param, @Body() body: D.UpdateBody) {
    return this.service.update(auth, id, body);
  }

  @Auth('DEFAULT')
  @Delete(':id')
  @ApiOperation({ summary: 'Toggle Role status' })
  toggleStatus(@AuthUser() auth: IAuthUser, @Param() { id }: D.Param) {
    return this.service.toggleStatus(auth, id);
  }
}
