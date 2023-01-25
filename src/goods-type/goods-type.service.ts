import { GoodType } from './entities/good-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateGoodsTypeDto } from './dto/create-goods-type.dto';
import { UpdateGoodsTypeDto } from './dto/update-goods-type.dto';
import { Repository } from 'typeorm';
import { Paging } from 'src/types/paging';
import { transformLike } from 'src/utils/transformLike';
import { GetGoodsTypeDto } from './dto/get-goods-type.dto';

@Injectable()
export class GoodsTypeService {
  constructor(
    @InjectRepository(GoodType)
    private readonly goodsTypeInject: Repository<GoodType>,
  ) {}
  async createGoodsType(createGoodsTypeDto: CreateGoodsTypeDto) {
    const data = new GoodType();
    data.name = createGoodsTypeDto.name;
    console.log(data);
    return await this.goodsTypeInject.save(data);
  }
  async getCategoryByOptions(options: GetGoodsTypeDto, paging: Paging) {
    const { size, page } = paging;
    const data = await this.goodsTypeInject.find({
      where: transformLike(options),
      skip: (size ?? 10) * ((page ?? 1) - 1),
      take: size,
    });
    const total = await this.goodsTypeInject.count({
      where: transformLike(options),
    });
    return {
      data,
      total,
    };
  }
  async updateCategoryById(id: number, updateCategoryDto: UpdateGoodsTypeDto) {
    const category = await this.goodsTypeInject.findOneBy({ id });
    Object.assign(category, updateCategoryDto);
    await this.goodsTypeInject.save(category);
  }
  async removeCategoryById(id: number) {
    await this.goodsTypeInject.delete({ id });
  }
  async getCategoryById(id: number) {
    return this.goodsTypeInject.findOneBy({ id });
  }
}
