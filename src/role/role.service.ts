import { CreatePermissionDto } from './../permission/dto/create-permission.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { UserService } from 'src/user/user.service';
import { GetRoleDto } from './dto/get-role.dto';
import { Paging } from 'src/types/paging';
import { transformLike } from 'src/utils/transformLike';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleInject: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionInject: Repository<Permission>,
    private permissionService: PermissionService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = new Role();
    console.log(createRoleDto);
    const { permissions } = createRoleDto;
    const data = await this.permissionInject.find({
      where: {
        id: In(permissions),
      },
    });

    const getParent = async (orgin: Permission) => {
      switch (orgin.type) {
        case 3:
          const data = await this.permissionInject.find({
            where: {
              type: 1,
              children: {
                children: {
                  id: orgin.id,
                },
              },
            },
            relations: ['children'],
          });
          console.log(data);
        case 2:
          return await this.permissionInject.find({
            where: {
              type: 1,
              children: {
                id: orgin.id,
              },
            },
            relations: ['children'],
          });
        case 1:
          break;
      }
    };
    const newdata = data.map(async (item) => {
      return await getParent(item);
    });
    return newdata;
    // const trees = await this.roleInject.manager
    //   .getTreeRepository(Permission)
    //   .findTrees();

    // return trees;

    Object.assign(role, createRoleDto);
    // return await this.roleInject.save(role);
  }
  async getRoleMenuByUserId(id: number) {
    const { roles } = await this.userService.findUserById(id);
    const trees = await this.roleInject.manager
      .getTreeRepository(Permission)
      .findTrees();
    const data = await this.roleInject.find({
      where: {
        id: roles[0].id,
      },
      relations: ['permissions'],
    });
    return {
      code: 200,
      data: data[0].permissions.map((item) => {
        return trees.filter((value) => value.id === item.id)[0];
      }),
    };
  }

  async createMenu(createPermissionDto: CreatePermissionDto, id: number) {
    return await this.permissionService.createPermission(
      createPermissionDto,
      id,
    );
  }
  async getRoleById(id: number) {
    return await this.roleInject.findOne({
      where: {
        id,
      },
      relations: ['permissions', 'users'],
    });
  }
  async getRolesById(ids: number[]) {
    return await this.roleInject.find({
      where: {
        id: In(ids),
      },
      relations: ['users'],
    });
  }
  async getAllRolesByOptions(getRoleDto: GetRoleDto, paging: Paging) {
    const { size, page } = paging;
    const data = await this.roleInject.find({
      where: transformLike(getRoleDto),
      skip: (size ?? 10) * ((page ?? 1) - 1),
      take: size,
    });
    const total = await this.roleInject.count({
      where: transformLike(getRoleDto),
    });
    return {
      data,
      total,
    };
  }
}
