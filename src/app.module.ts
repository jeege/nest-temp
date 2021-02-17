import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './modules/member/member.module';
import { DataBaseConfig } from './config/database';
@Module({
  imports: [TypeOrmModule.forRoot(DataBaseConfig), MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
