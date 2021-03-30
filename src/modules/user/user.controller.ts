import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/common/decorators/token.decorator';
import { Pagination, PaginationOptions } from 'src/utils/pagination.util';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('info')
    @UseGuards(JwtAuthGuard)
    async getUserInfo(@Token() token) {
        const userToken = this.jwtService.decode(token)
        return await this.userService.findById((<Partial<User>>userToken).id)
    }


    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() user: Partial<User>): Promise<User> {
        return await this.userService.createUser(user)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('list')
    @UseGuards(JwtAuthGuard)
    async list(@Query() options: Partial<User & PaginationOptions<User>>): Promise<Pagination<User>> {
        return await this.userService.findAll(options)
    }

    @Get('remove')
    async remove(@Query('id') id) {
        this.userService.removeUser(id)
    }
}
