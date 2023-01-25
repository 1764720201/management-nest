import { GetGoodDto } from './dto/get-good.dto';
import { GoodsTypeService } from './../goods-type/goods-type.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { Goods } from './entities/goods.entity';
import { Repository } from 'typeorm';
import { Paging } from 'src/types/paging';
import { transformLike } from 'src/utils/transformLike';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods) private readonly goodsInject: Repository<Goods>,
    private goodsTypeService: GoodsTypeService,
  ) {}
  async createGoods(createGoodDto: CreateGoodDto) {
    const { typeId, picture, ...other } = createGoodDto;
    const good = new Goods();
    const type = await this.goodsTypeService.getCategoryById(typeId);
    Object.assign(good, other);
    good.picture = `/file/${picture}`;
    good.type = type;
    await this.goodsInject.save(good);
  }
  async getGoodsByOptions(getGoodDto: GetGoodDto, paging: Paging) {
    const { size, page } = paging;
    const data = await this.goodsInject.find({
      where: transformLike(getGoodDto),
      skip: (size ?? 10) * ((page ?? 1) - 1),
      take: size,
    });
    const total = await this.goodsInject.count({
      where: transformLike(getGoodDto),
    });
    return {
      data,
      total,
    };
  }
  async getGoodsById(id: number) {
    return this.goodsInject.findOne({
      where: {
        id,
      },
      relations: ['type'],
    });
  }
}
