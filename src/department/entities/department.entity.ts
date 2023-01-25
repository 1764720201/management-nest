import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
@Tree('closure-table')
@Entity()
export class Department {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;

  @JoinTable({ name: 'department_user' })
  @ManyToMany(() => User, (user) => user.departments)
  users: User[];
  @ManyToMany(() => Role, (role) => role.departments)
  @JoinTable({ name: 'department_role' })
  roles: Role[];

  @ManyToOne(() => User)
  leader: User;

  @TreeParent()
  parent: Department;
  @TreeChildren()
  children: Department[];
}
