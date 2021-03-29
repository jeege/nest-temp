import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfig } from './config/database';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { NovelModule } from './modules/novel/novel.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [...DataBaseConfig.map(conf => TypeOrmModule.forRoot(conf)), UserModule, AuthModule, MemberModule, NovelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
