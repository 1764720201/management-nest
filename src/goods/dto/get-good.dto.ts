import { IsOptional } from 'class-validator';

export class GetGoodDto {
  @IsOptional()
  public readonly name: string;
  @IsOptional()
  public readonly address: string;
  @IsOptional()
  public readonly status: number;
  @IsOptional()
  public readonly createTimeRange: Date[];
}
