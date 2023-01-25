import { DepartmentService } from './../department/department.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Department } from './../department/entities/department.entity';
import { transformLike } from './../utils/transformLike';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { crypt } from 'src/utils/encryption';
import { GetUserDto } from './dto/get-user.dto';
import { Paging } from 'src/types/paging';
import { RoleService } from 'src/role/role.service';
import {
  CREATE_SUCCESS,
  UPDATE_STATUS_SUCCESS,
} from 'src/constant/success-message';
import { StatusCode } from 'src/constant/status-code';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userInject: Repository<User>,
    @InjectRepository(Role) private readonly roleInject: Repository<Role>,
    @InjectRepository(Department)
    private readonly departmentInject: Repository<Department>,
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
    @Inject(forwardRef(() => DepartmentService))
    private departService: DepartmentService,
  ) {}
  async createUser(createUser: CreateUserDto) {
    const user = new User();
    const encryption = await crypt(createUser.password, 10);
    const { username, cellphone, relname, roles, departments } = createUser;
    user.username = username;
    user.password = encryption;
    user.avatarUrl = '/avatar/1673855067871.png';
    user.cellphone = cellphone;
    user.relname = relname;
    user.roles = await this.roleService.getRolesById(roles);
    user.departments = await this.departService.getDepartmentsById(departments);
    await this.userInject.save(user);
    return {
      message: CREATE_SUCCESS,
      code: StatusCode.SUCCESS,
    };
  }

  findUserByUsername(username: string) {
    return this.userInject.findOne({
      where: {
        username,
      },
    });
  }
  async findUserById(id: number) {
    const data = await this.userInject.find({
      where: {
        id: id,
      },
      relations: ['roles', 'departments'],
    });
    return data[0];
  }
  async getUserByOptions(options: GetUserDto, paging: Paging) {
    const { size, page } = paging;
    const data = await this.userInject.find({
      where: transformLike(options),
      skip: (size ?? 10) * ((page ?? 1) - 1),
      take: size,
    });
    const total = await this.userInject.count({
      where: transformLike(options),
    });
    return {
      data,
      total,
    };
  }
  async deleteUser(id: number) {
    return await this.userInject.delete({
      id,
    });
  }
  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userInject.findOneBy({ id });
    const { roles, departments, ...other } = updateUserDto;
    user.roles = await this.roleService.getRolesById(roles);
    user.departments = await this.departService.getDepartmentsById(departments);
    Object.assign(user, other);
    return await this.userInject.save(user);
  }
  async updateUserStatusById(id: number) {
    const user = await this.userInject.findOneBy({ id });
    if (user.status) {
      user.status = 0;
    } else {
      user.status = 1;
    }
    await this.userInject.save(user);
    return {
      code: StatusCode.SUCCESS,
      message: UPDATE_STATUS_SUCCESS,
    };
  }
}
