import { Department } from './../department/entities/department.entity';
import { DepartmentModule } from './../department/department.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Department]),
    AuthModule,
    RoleModule,
    DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
