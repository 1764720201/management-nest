import { Paging } from 'src/types/paging';
import { GetGoodDto } from './dto/get-good.dto';
import {
  Controller,
  Post,
  Body,
  Query,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post('create')
  createGoods(@Body() createGoodDto: CreateGoodDto) {
    // console.log(createGoodDto);
    return this.goodsService.createGoods(createGoodDto);
  }
  @Post()
  getGoodsByOptions(@Body() getGoodDto: GetGoodDto, @Query() paging: Paging) {
    return this.goodsService.getGoodsByOptions(getGoodDto, paging);
  }
  @Get(':id')
  getGoodsById(@Param('id') id: number) {
    return this.goodsService.getGoodsById(id);
  }
}
