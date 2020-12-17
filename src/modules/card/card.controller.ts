import { Controller, Get, Post, Query, Body, UseInterceptors } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/card.dto'
import { TansformInterceptor } from '../../common/interceptors/transform.interceptor';

@UseInterceptors(TansformInterceptor)
@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('list')
    getCardList(): Promise<Card[]>{
        return this.cardService.getCardList();
    }

    @Get('detail')
    getCardDetail(@Query('id') id: string): Promise<Card> {
        return this.cardService.getCardDetail(+id);
    }

    @Post('insert')
    async insertCard(@Body() createCardDto: CreateCardDto): Promise<string>  {
        await this.cardService.insertCard(createCardDto)
        return '成功'
    }
}
