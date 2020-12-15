import { Controller, Get, Post, Query } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('list')
    getCardList(): Promise<Card[]>{
        return this.cardService.getCardList();
    }

    @Get('detail')
    getCardDetail(@Query('id') id: string): string {
        return this.cardService.getCardDetail(id);
    }

    @Post('insert')
    async insertCard(): Promise<string>  {
        await this.cardService.insertCard()
        return '成功'
    }
}
