import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentDto } from './dto/get-department.dto';
import { Paging } from 'src/types/paging';

@UseGuards(AuthGuard('jwt'))
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }
  @Post()
  getAllDepartmentByOptions(
    @Body() options: GetDepartmentDto,
    @Query() query: Paging,
  ) {
    return this.departmentService.getAllDepartmentByOptions(options, query);
  }
  @Get(':id')
  getDepartmentById(@Param('id') id: number) {
    return this.departmentService.getDepartmentById(id);
  }
  @Patch(':id')
  updateDepartmentById(
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Param('id') id: number,
  ) {
    return this.departmentService.updateDepartmentById(id, updateDepartmentDto);
  }
  @Delete(':id')
  deleteDepartmentById(@Param('id') id: number) {
    return this.departmentService.deteleDepartmentById(id);
  }
}
