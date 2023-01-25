import { GoodType } from './entities/good-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GoodsTypeService } from './goods-type.service';
import { GoodsTypeController } from './goods-type.controller';
import { Goods } from 'src/goods/entities/goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodType, Goods])],
  controllers: [GoodsTypeController],
  providers: [GoodsTypeService],
  exports: [GoodsTypeService],
})
export class GoodsTypeModule {}
