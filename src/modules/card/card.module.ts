import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card } from './card.entity'
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TansformInterceptor } from '../../common/interceptors/transform.interceptor'
@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardService, {
    provide: APP_INTERCEPTOR,
    useClass: TansformInterceptor
  }],
  controllers: [CardController]
})
export class CardModule {
}
