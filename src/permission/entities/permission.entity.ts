import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Permission {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column('varchar')
  name: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  url?: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  icon?: string;
  @Column('int', { comment: '1:一级目录,2:二级目录,3:操作' })
  type: number;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  permission?: string;

  @TreeParent()
  parent: Permission;

  @TreeChildren()
  children: Permission[];

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
