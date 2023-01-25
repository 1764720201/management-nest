import { IsNotEmpty, IsOptional } from 'class-validator';
import { GetUserDto } from './get-user.dto';

export class CreateUserDto extends GetUserDto {
  @IsNotEmpty()
  public readonly password: string;
  @IsOptional()
  public readonly avatarUrl: string;
  @IsNotEmpty()
  public readonly roles: number[];
  @IsNotEmpty()
  public readonly departments: number[];
}
