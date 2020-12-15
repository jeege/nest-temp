import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
    ) {}

    getCardList(): Promise<Card[]> {
        return this.cardsRepository.find();
    }

    getCardDetail(id: string): string {
        return '卡片详情' + id;
    }

    async insertCard() {
        const card = new Card();
        card.name = '老虎'
        card.voice = 'https://www.baidu.com'
        card.img = 'https://www.baidu.com'
        card.type = 2
        await this.cardsRepository.save(card)
    }
}
