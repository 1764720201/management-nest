import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  public readonly cellphone?: string;
  @IsString()
  @IsOptional()
  public readonly relname?: string;
  @IsArray()
  @IsOptional()
  public readonly createTime?: Date;
  @IsArray()
  @IsOptional()
  public readonly updateTime?: Date;
  @IsNumber()
  @IsOptional()
  public readonly status?: number;
  @IsString()
  @IsOptional()
  public readonly username?: string;
}
