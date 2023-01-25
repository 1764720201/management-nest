import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import type { Paging } from 'src/types/paging';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  getAllPermission(@Param() paging: Paging) {
    return this.permissionService.getAllPermission(paging);
  }
}
