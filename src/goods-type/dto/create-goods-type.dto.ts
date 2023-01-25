import { IsString } from 'class-validator';

export class CreateGoodsTypeDto {
  @IsString()
  public readonly name: string;
}
