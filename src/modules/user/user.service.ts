import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination, Pagination, PaginationOptions } from 'src/utils/pagination.util';
import { Repository } from 'typeorm';
import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private UserRepository: Repository<User>,
    ) {}

    /**
     * 创建用户
     * @param user 
     */
    async createUser(user: Partial<User>): Promise<User> {
        const { name } = user
        const existUser = await this.UserRepository.findOne({ where: { name } })

        if(existUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
        }

        const newUser = await this.UserRepository.create(user);
        await this.UserRepository.save(newUser)
        return newUser
    }

    async findById(id: number): Promise<User> {
        return this.UserRepository.findOne(id)
    } 

    async findAll(queryParams: Partial<User & PaginationOptions>): Promise<Pagination<User>> {
        return pagination(this.UserRepository, queryParams)
    }


    async login(user: Partial<User>): Promise<User> {
        const {name, password} = user
        const existUser = await this.UserRepository.findOne({ where: { name }})

        if (!existUser || !(await User.comparePassword(password, existUser.password))) {
            throw new HttpException('用户名或密码错误',HttpStatus.BAD_REQUEST)
        }

        return existUser
    }
}