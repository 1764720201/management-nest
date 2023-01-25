import { Goods } from '../../goods/entities/goods.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class GoodType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
  @OneToMany(() => Goods, (goods) => goods.type)
  goods: Goods[];
}
