import { Controller, Get, Post, Query, Body, UseInterceptors } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/member.dto'
import { TansformInterceptor } from '../../common/interceptors/transform.interceptor';

@UseInterceptors(TansformInterceptor)
@Controller('Member')
export class MemberController {
    constructor(private readonly MemberService: MemberService) {}

    @Get('list')
    getMemberList(): Promise<Member[]>{
        return this.MemberService.getMemberList();
    }

    @Get('detail')
    getMemberDetail(@Query('id') id: string): Promise<Member> {
        return this.MemberService.getMemberDetail(+id);
    }

    @Post('insert')
    async insertMember(@Body() createMemberDto: CreateMemberDto): Promise<string>  {
        await this.MemberService.insertMember(createMemberDto)
        return '成功'
    }
}
