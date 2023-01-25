import { Department } from 'src/department/entities/department.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  intro: string;
  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;

  @ManyToMany(() => User, (user) => user.roles, {
    cascade: true,
  })
  @JoinTable({ name: 'user_role' })
  users: User[];

  @ManyToMany(() => Department, (department) => department.roles, {
    cascade: true,
  })
  departments: Department[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({ name: 'role_permission' })
  permissions: Permission[];
}
