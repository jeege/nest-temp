import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Query, UseInterceptors } from '@nestjs/common';
import { Pagination, PaginationOptions } from 'src/utils/pagination.util';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() user: Partial<User>): Promise<User> {
        return await this.userService.createUser(user)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('list')
    async list(@Query() options: Partial<User & PaginationOptions>): Promise<Pagination<User>> {
        return await this.userService.findAll(options)
    }
}
