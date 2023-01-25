import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly intro: string;
  @IsArray()
  public readonly permissions: number[];
}
