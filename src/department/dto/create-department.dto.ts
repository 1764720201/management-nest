import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  public readonly name: string;
  @IsNumber()
  public readonly leaderId: number;
  @IsOptional()
  public readonly parentId?: number;
}
