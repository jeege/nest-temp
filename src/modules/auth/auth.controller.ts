import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { SetHeader } from "src/common/decorators/set-cookie.decorator";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@SetHeader() setHeader, @Body() user) {
        const [loginUser, token] = await this.authService.login(user)
        setHeader('token', token)
        return loginUser
    }
}