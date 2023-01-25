import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsTypeDto } from './create-goods-type.dto';

export class UpdateGoodsTypeDto extends PartialType(CreateGoodsTypeDto) {}
