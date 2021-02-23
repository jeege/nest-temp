import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfig } from './config/database';
import { MemberModule } from './modules/member/member.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(DataBaseConfig), MemberModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
