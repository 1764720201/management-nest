import { IsString, IsOptional } from 'class-validator';

export class GetRoleDto {
  @IsString()
  @IsOptional()
  public readonly name: string;
  @IsString()
  @IsOptional()
  public readonly intro: string;
  @IsOptional()
  public readonly createTime: Date;
}
