import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  public readonly username: string;
  @IsNotEmpty()
  public readonly password: string;
}
