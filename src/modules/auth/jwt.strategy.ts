import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { jwtConstants } from "../../config/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: User) {
        const user = await this.authService.validate(payload)
        if(!user) {
            throw new UnauthorizedException('身份验证失败')
        }

        return user
    }
}