import { Controller, Get, Query } from '@nestjs/common';
import { CardService } from './card.service'
import {  } from 'express';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('list')
    getCardList(): string {
        return this.cardService.getCardList();
    }

    @Get('detail')
    getCardDetail(@Query('id') id: string): string {
        return this.cardService.getCardDetail(id);
    }
}
