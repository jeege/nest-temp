import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SearchParam  } from "src/common/decorators/pagination.decorator";
import { NovelService } from "./novel.service";

@Controller('Novel')
export class NovelController {
    constructor(private readonly novelService: NovelService) {}

    @Get('list')
    async list(@SearchParam() options) {
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