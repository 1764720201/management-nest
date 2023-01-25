import { GoodsTypeModule } from './../goods-type/goods-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goods]), GoodsTypeModule],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
