import { CreatePermissionDto } from './../permission/dto/create-permission.dto';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetRoleDto } from './dto/get-role.dto';
import { Paging } from 'src/types/paging';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('menu/:userId')
  getRoleMenuByUserId(@Param('userId') userId: number) {
    return this.roleService.getRoleMenuByUserId(userId);
  }
  @Post('menu')
  createMenu(
    @Body() createPermission: CreatePermissionDto,
    @Query('id') id: number,
  ) {
    return this.roleService.createMenu(createPermission, id);
  }
  @Post()
  getAllRolesByOptions(
    @Body() getRoleDto: GetRoleDto,
    @Param() paging: Paging,
  ) {
    return this.roleService.getAllRolesByOptions(getRoleDto, paging);
  }
}
