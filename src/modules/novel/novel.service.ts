import { HttpException, HttpService, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomLogger } from "src/interfaces/logger.interface";
import { Pagination, pagination } from "src/utils/pagination.util";
import { Repository } from "typeorm";
import { Novel } from "./novel.entity";

@Injectable()
export class NovelService {
    constructor(
        @Inject('winston') private logger: CustomLogger,
        @InjectRepository(Novel, 'novel')
        private NovelRepository: Repository<Novel>,
        private readonly httpService: HttpService
    ) {}

    async getList(options): Promise<Pagination<Novel>> {
        return pagination(this.NovelRepository, options)
    }

    async insertNovel(novel) {
        const { novelId } = novel
        const existNovel = await this.NovelRepository.findOne({ where: { novelId }})
        if (existNovel) {
            throw new HttpException('小说已存在', HttpStatus.BAD_REQUEST)
        }

        const  newNovel = await this.NovelRepository.create(novel)
        await this.NovelRepository.save(newNovel)
    }

    async getEvaluation(novelId) {
        const res =  await this.httpService.request({
            url: `http://www.zxcs.me/content/plugins/cgz_xinqing/cgz_xinqing_action.php?action=show&id=${novelId}`
        }).toPromise()
        if (res.status === 200) {
            return res.data.split(',')
        }
    }

    async getNextNovel(novelId) {
        const res = await this.httpService.request({
            url: `http://www.zxcs.me/post/${novelId}`,
            headers: {
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            }
        }).toPromise()
        if (res.status === 200) {
            const data = res.data
            const nextNovel = (/<div class="prevlog">(.*?)<\/div>/.exec(data))[1]
            const nextInfo = /http:\/\/www.zxcs.me\/post\/(\d*).*<\/span>(.*)<\/a>/.exec(nextNovel)
            const novel: Partial<Novel> = {}
            if (nextInfo) {
                novel.novelId = nextInfo[1];
                novel.novelName = nextInfo[2].trim();
                [novel.a, novel.b, novel.c, novel.d, novel.e] = await this.getEvaluation(novel.novelId)
                return novel
            } else {
                return null
            }
        }
    }

    @Cron('0 0 0 * * *')
    async updateNovel() {
        const latestNovel = await this.NovelRepository.findOne({
            order: {
                id: "DESC"
            }
        })
        this.logger.task(`开始更新小说，上一本${latestNovel.novelId}`)
        let nextNovel = await this.getNextNovel(latestNovel.novelId)
        while(nextNovel) {
            const data = await this.insertNovel(nextNovel).catch(err => {
                this.logger.task(`已存在小说：${nextNovel.novelName}`)
                return err.getStatus()
            })
            if (data === 400) {
                nextNovel = null
            } else {
                this.logger.task(`已添加${nextNovel.novelName}`)
                nextNovel = await this.getNextNovel(nextNovel.novelId)
            }
        }
        this.logger.task('更新结束')
    }

    @Cron('0 40 22 14 * *')
    async updateEvaluation() {
        this.logger.task('开始更新小说评价')
        let novel = await this.NovelRepository.findOne(1)
        while (novel) {
            try {
                const [a,b,c,d,e] = await this.getEvaluation(novel.novelId)
                const merged = this.NovelRepository.merge(novel, { a, b, c, d, e })
                await this.NovelRepository.save(merged)
                this.logger.task(`已更新小说${novel.novelName}的评价`)
                novel = await this.NovelRepository.findOne(novel.id += 1)
            } catch (error) {
                this.logger.task(`更新小说${novel.novelName}的评价出错了，错误信息：${error.message}`)
            }
        }
        this.logger.task('小说评价更新完成')
    }
}