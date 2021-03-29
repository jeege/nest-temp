import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NovelController } from "./novel.controller";
import { Novel } from "./novel.entity";
import { NovelService } from "./novel.service";

@Module({
    imports: [TypeOrmModule.forFeature([Novel], 'novel')],
    providers: [NovelService],
    controllers: [NovelController]
})
export class NovelModule {}