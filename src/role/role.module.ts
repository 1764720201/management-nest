import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionModule } from 'src/permission/permission.module';
import { Permission } from 'src/permission/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => PermissionModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
