import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { DepartmentModule } from './department/department.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoodsTypeModule } from './goods-type/goods-type.module';
import { GoodsModule } from './goods/goods.module';
import configuration from './config';
@Module({
  imports: [
    UserModule,
    UploadModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    DepartmentModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: true,
        retryDelay: 500,
        retryAttempts: 10,
      }),
      inject: [ConfigService],
    }),
    GoodsTypeModule,
    GoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
