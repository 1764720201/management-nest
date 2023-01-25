import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { encrypt } from 'src/utils/encryption';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    const ifValidity = await encrypt(pass, user.password);
    // const ifValidity = await bcrypt.compare(pass, user.password);
    if (user && ifValidity) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto, res: Response) {
    const userinfo = await this.userService.findUserByUsername(user.username);
    const payload = { username: user.username, sub: userinfo.id };
    res.send({
      message: '登陆成功',
      code: 200,
      data: {
        token: this.jwtService.sign(payload),
        username: user.username,
        userId: userinfo.id,
      },
    });
  }
}
