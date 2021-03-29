import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private MembersRepository: TreeRepository<Member>,
    ) {}

    getMemberList(): Promise<Member[]> {
        return this.MembersRepository.find();
    }

    getMemberDetail(memberId: string): Promise<Member> {
        return this.MembersRepository.findOne({memberId});
    }

    async removeMember(id: string) {
        const member = await this.getMemberDetail(id)
        const children = await this.MembersRepository.findAncestors(member)
        await this.MembersRepository.remove(children)
    }

    async getChildrens(parent: Member) {
        return await this.MembersRepository.findDescendantsTree(parent)
    }

    async insertMember(createMemberDto: Partial<Member>, parent?: Member) {
        const member = new Member();
        Object.assign(member, createMemberDto)
        if (parent) member.parent = parent
        await this.MembersRepository.save(member)
    }
}
