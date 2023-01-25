import { RoleService } from 'src/role/role.service';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { ERROR_CREATE_PERMISSION } from 'src/constant/error-message';
import { Paging } from 'src/types/paging';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionInject: Repository<Permission>,
    @InjectRepository(Role) private readonly roleInject: Repository<Role>,
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {}
  async createPermission(createPermission: CreatePermissionDto, id: number) {
    const { parentId, ...permissionDetail } = createPermission;
    let parentPermission: Permission;
    if (parentId) {
      parentPermission = await this.getPermissionById(parentId);
    }
    const permission = new Permission();
    const role = await this.roleService.getRoleById(id);
    if (createPermission.type === 1) {
      Object.assign(permission, permissionDetail);
      role.permissions.push(permission);
      await this.roleInject.save(role);
      await this.permissionInject.save(permission);
    } else if (createPermission.type === 2 || 3) {
      Object.assign(permission, createPermission);
      parentPermission.children?.push(permission);
      permission.parent = parentPermission;
      await this.permissionInject.save(permission);
    } else {
      return {
        message: ERROR_CREATE_PERMISSION,
        code: 400,
      };
    }
    return {
      message: '创建成功',
      code: 200,
      data: permission,
    };
  }
  async getPermissionById(id: number) {
    return await this.permissionInject.findOne({
      where: {
        id,
      },
      relations: ['roles'],
    });
  }
  async getAllPermission(paging: Paging) {
    const { size, page } = paging;
    const data = await this.permissionInject.manager
      .getTreeRepository(Permission)
      .findTrees();
    const total = await this.permissionInject.count({
      where: {
        type: 1,
      },
    });
    return {
      data,
      total,
    };
  }
}
