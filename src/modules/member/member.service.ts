import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/member.dto'

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private MembersRepository: Repository<Member>,
    ) {}

    getMemberList(): Promise<Member[]> {
        return this.MembersRepository.find();
    }

    getMemberDetail(id: number): Promise<Member> {
        return this.MembersRepository.findOne({id});
    }

    async insertMember(createMemberDto: CreateMemberDto) {
        const member = new Member();
        Object.assign(member, createMemberDto)
        await this.MembersRepository.save(member)
    }
}
