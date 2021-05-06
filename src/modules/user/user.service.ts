import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultAdmin } from 'src/constants/common.constants';
import { CustomLogger } from 'src/interfaces/logger.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @Inject('winston') private logger: CustomLogger,
        @InjectRepository(User)
        private UserRepository: Repository<User>,
    ) {
        const { name, password } = defaultAdmin
        this.createUser({name, password}).then(() => {
            this.logger.info(`已创建默认用户：${name},密码：${password}`)
        }).catch(() => {
            this.logger.warning('已存在默认用户')
        })
    }

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

    async removeUser(id): Promise<void> {
        await this.UserRepository.softDelete(id)
    }

    async findById(id: number): Promise<User> {
        return this.UserRepository.findOne(id)
    } 

    async findAll(options) {
        const [ list, total ] = await this.UserRepository.findAndCount({
            ...options.searchParam
        })
        return { list, total }
    }

    /**
     * 用户登陆
     * @param user 
     */
    async login(user: Partial<User>): Promise<User> {
        const {name, password} = user
        const existUser = await this.UserRepository.findOne({ where: { name }})

        if (!existUser || !(await User.comparePassword(password, existUser.password))) {
            throw new HttpException('用户名或密码错误',HttpStatus.BAD_REQUEST)
        }

        return existUser
    }
}