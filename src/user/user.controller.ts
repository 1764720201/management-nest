import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Param,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get-user.dto';
import { Paging } from 'src/types/paging';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginUser: LoginUserDto, @Res() res: Response) {
    return this.authService.login(loginUser, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUserinfoById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  getUserByOptions(@Body() options: GetUserDto, @Query() query: Paging) {
    return this.userService.getUserByOptions(options, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(id, updateUserDto);
    return this.userService.updateUserById(id, updateUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/status/:id')
  updateUserStatusById(@Param('id') id: number) {
    return this.userService.updateUserStatusById(id);
  }
}
