import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
    getCardList(): string {
        return '获取卡片列表';
    }
    getCardDetail(id: string): string {
        return '卡片详情' + id;
    }
}
