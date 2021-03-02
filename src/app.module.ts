import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfig } from './config/database';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(DataBaseConfig), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
