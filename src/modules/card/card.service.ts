import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/card.dto'

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
    ) {}

    getCardList(): Promise<Card[]> {
        return this.cardsRepository.find();
    }

    getCardDetail(id: number): Promise<Card> {
        return this.cardsRepository.findOne({id});
    }

    async insertCard(createCardDto: CreateCardDto) {
        const card = new Card();
        Object.assign(card, createCardDto)
        await this.cardsRepository.save(card)
    }
}
