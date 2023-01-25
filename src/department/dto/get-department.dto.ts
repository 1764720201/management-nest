import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetDepartmentDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @IsOptional()
  @IsString()
  public readonly leaderName?: string;
  @IsArray()
  @IsOptional()
  public readonly createTime?: Date;
  // public readonly leaderId?: number[];
}
