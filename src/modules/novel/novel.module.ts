import { HttpModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NovelController } from "./novel.controller";
import { Novel } from "./novel.entity";
import { NovelService } from "./novel.service";

@Module({
    imports: [TypeOrmModule.forFeature([Novel], 'novel'), HttpModule.register({
        timeout: 5000,
        maxRedirects: 5
    })],
    providers: [NovelService],
    controllers: [NovelController]
})
export class NovelModule {}