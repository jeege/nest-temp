import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    createToken(user: Partial<User>) {
        const accessToken = this.jwtService.sign(user)
        return accessToken
    }

    async login(user: Partial<User>) {
        const data = await this.userService.login(user)
        const token = this.createToken({
            id: data.id,
            name: data.name
        })
        return [data, `Bearer ${token}`]
    }
    
    async validate(payload: User): Promise<any> {
        return await this.userService.findById(payload.id)
    }
}