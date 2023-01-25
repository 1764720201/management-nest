import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetGoodsTypeDto {
  @IsString()
  @IsOptional()
  public readonly name: string;
  @IsOptional()
  @IsArray()
  public readonly createTimeRange: Date[];
}
