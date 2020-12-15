import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './modules/card/card.module';
import { DataBaseConfig } from './config/database';
@Module({
  imports: [TypeOrmModule.forRoot(DataBaseConfig), CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
