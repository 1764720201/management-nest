import { Department } from 'src/department/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', length: 11, nullable: true })
  cellphone?: string;
  @Column({ type: 'varchar' })
  relname: string;
  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  createTime: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  updateTime: Date;
  @Column({ type: 'varchar', name: 'avatar_url' })
  avatarUrl: string;
  @Column({ type: 'int', default: 0, comment: '0表示正常用户,1表示禁止用户' })
  status: number;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @ManyToMany(() => Department, (department) => department.users)
  departments: Department[];

  @OneToMany(() => Department, (department) => department.leader)
  leaderDepartments: Department[];
}
