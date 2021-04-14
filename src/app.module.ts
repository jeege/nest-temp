import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { DataBaseConfig } from './config/database';
import { WinstonConfig } from './config/winston';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { NovelModule } from './modules/novel/novel.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    ...DataBaseConfig.map(config => TypeOrmModule.forRoot(config)), 
    UserModule, 
    AuthModule, 
    MemberModule, 
    NovelModule, 
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
