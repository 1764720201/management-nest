import { GoodType } from '../../goods-type/entities/good-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Goods {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'double' })
  price: number;
  @Column({ type: 'varchar' })
  intro: string;
  @Column({ type: 'int', default: 0 })
  status: number;
  @Column({ type: 'varchar' })
  picture: string;
  @Column({ type: 'int' })
  repertory: number;
  @Column({ type: 'int', default: 0 })
  sales: number;
  @Column({ type: 'int', default: 0 })
  collects: number;
  @Column({ type: 'varchar' })
  address: string;
  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
  @ManyToOne(() => GoodType)
  type: GoodType;
}
