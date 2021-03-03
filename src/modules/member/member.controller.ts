import { Controller, Get, Post, Query, Body, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.entity';


@Controller('Member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Get('list')
    getMemberList(): Promise<Member[]>{
        return this.memberService.getMemberList();
    }

    @Get('detail')
    getMemberDetail(@Query('id') id: string): Promise<Member> {
        return this.memberService.getMemberDetail(id);
    }

    @Delete('remove')
    async deleteMember(@Query('id') id: string) {
        return await this.memberService.removeMember(id)
    }

    @Get('children')
    async getChildrens(@Query('id') id: string) {
        const parent = await this.memberService.getMemberDetail(id)
        return this.memberService.getChildrens(parent)
    }

    @Post('insert')
    @HttpCode(HttpStatus.OK)
    async insertMember(@Body() createMemberDto: Partial<Member & {parentId: string}>): Promise<void>  {
        const parent = createMemberDto.parentId ? await this.memberService.getMemberDetail(createMemberDto.parentId) : null
        await this.memberService.insertMember(createMemberDto, parent)
    }
}
