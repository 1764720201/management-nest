import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCode } from 'src/constant/status-code';
import { CREATE_SUCCESS } from 'src/constant/success-message';
import { Paging } from 'src/types/paging';
import { UserService } from 'src/user/user.service';
import { transformLike } from 'src/utils/transformLike';
import { Repository, Like, In } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentDto } from './dto/get-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentInject: Repository<Department>,
    private userService: UserService,
  ) {}
  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = new Department();
    const { parentId, leaderId, name } = createDepartmentDto;
    department.name = name;
    const leader = await this.userService.findUserById(leaderId);
    department.leader = leader;
    if (parentId) {
      const parentDepartment = await this.getDepartmentById(parentId);
      parentDepartment.children.push(department);
      department.parent = parentDepartment;
    }
    await this.departmentInject.save(department);
    return {
      message: CREATE_SUCCESS,
      code: StatusCode.SUCCESS,
    };
  }
  async getAllDepartmentByOptions(options: GetDepartmentDto, paging: Paging) {
    const { size, page } = paging;
    const { leaderName, ...other } = options;
    const data = await this.departmentInject.find({
      where: {
        leader: {
          relname: Like(`%${leaderName || ''}%`),
        },
        ...transformLike(other),
      },
      skip: (size ?? 10) * ((page ?? 1) - 1),
      take: size,
      relations: ['leader', 'parent'],
    });
    const total = await this.departmentInject.count({
      where: {
        leader: {
          relname: Like(`%${leaderName}%`),
        },
        ...transformLike(other),
      },
    });
    return {
      data,
      total,
    };
  }
  async getDepartmentById(id: number) {
    return await this.departmentInject.findOne({
      where: {
        id,
      },
      relations: ['leader', 'parent'],
    });
  }
  async updateDepartmentById(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const { leaderId, parentId, name } = updateDepartmentDto;
    const department = await this.departmentInject.findOneBy({ id });
    if (leaderId) {
      department.leader = await this.userService.findUserById(leaderId);
    }
    if (parentId) {
      department.parent = await this.departmentInject.findOneBy({
        id: parentId,
      });
    }
    department.name = name;
    return await this.departmentInject.save(department);
  }
  async deteleDepartmentById(id: number) {
    return await this.departmentInject.delete({ id });
  }
  async getDepartmentsById(ids: number[]) {
    return await this.departmentInject.find({
      where: {
        id: In(ids),
      },
      relations: ['users'],
    });
  }
}
