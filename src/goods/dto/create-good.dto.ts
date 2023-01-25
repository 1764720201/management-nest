import { IsOptional, IsString } from 'class-validator';

export class CreateGoodDto {
  @IsOptional()
  @IsString()
  public readonly name: string;
  @IsOptional()
  public readonly oldPrice: number;
  @IsOptional()
  public readonly newPrice: number;
  @IsOptional()
  @IsString()
  public readonly intro: string;
  @IsOptional()
  public readonly picture: string;
  @IsString()
  @IsOptional()
  public readonly repertory: string;
  @IsString()
  @IsOptional()
  public readonly address: string;
  @IsOptional()
  public readonly typeId: number;
}
