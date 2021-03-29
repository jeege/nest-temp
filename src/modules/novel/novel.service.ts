import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination, pagination } from "src/utils/pagination.util";
import { Repository } from "typeorm";
import { Novel } from "./novel.entity";

@Injectable()
export class NovelService {
    constructor(
        @InjectRepository(Novel, 'novel')
        private NovelRepository: Repository<Novel>
    ) {}

    async getList(options): Promise<Pagination<Novel>> {
        return pagination(this.NovelRepository, options)
    }

    async insertNovel(novel) {
        const  newNovel = await this.NovelRepository.create(novel)
        await this.NovelRepository.save(newNovel)
    }
}