import {
  Controller,
  Post,
  Body,
  UseGuards,
  Query,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { GoodsTypeService } from './goods-type.service';
import { CreateGoodsTypeDto } from './dto/create-goods-type.dto';
import { UpdateGoodsTypeDto } from './dto/update-goods-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetGoodsTypeDto } from './dto/get-goods-type.dto';
import { Paging } from 'src/types/paging';
@UseGuards(AuthGuard('jwt'))
@Controller('goods-type')
export class GoodsTypeController {
  constructor(private readonly goodsTypeService: GoodsTypeService) {}

  @Post('create')
  createGoodsType(@Body() createGoodsTypeDto: CreateGoodsTypeDto) {
    return this.goodsTypeService.createGoodsType(createGoodsTypeDto);
  }
  @Post()
  getCategoryByOptions(
    @Body() getGoodsTypeDto: GetGoodsTypeDto,
    @Query() paging: Paging,
  ) {
    return this.goodsTypeService.getCategoryByOptions(getGoodsTypeDto, paging);
  }
  @Patch(':id')
  updateCategoryById(
    @Param('id') id: number,
    @Body() updateCategory: UpdateGoodsTypeDto,
  ) {
    return this.goodsTypeService.updateCategoryById(id, updateCategory);
  }

  @Delete(':id')
  removeCategoryById(@Param('id') id: number) {
    return this.goodsTypeService.removeCategoryById(id);
  }
  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.goodsTypeService.getCategoryById(id);
  }
}
