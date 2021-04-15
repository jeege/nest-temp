import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { PaginationOptions } from "src/utils/pagination.util";
import { Novel } from "./novel.entity";
import { NovelService } from "./novel.service";

@Controller('Novel')
export class NovelController {
    constructor(private readonly novelService: NovelService) {}

    @Get('list')
    async list(@Query() options: Partial<PaginationOptions<Novel>>) {
        return this.novelService.getList(options)
    } 
    
    @Get('latest')
    async getLatestNovel() {
        return this.novelService.updateNovel()
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    async addNovel(@Body() novel) {
        novel.novelId = novel.id
        novel.novelName = novel.name
        delete novel.id
        delete novel.name
        await this.novelService.insertNovel(novel)
    }
}