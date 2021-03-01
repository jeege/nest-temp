import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

const passportModule = PassportModule.register({
    defaultStrategy: 'jwt'
})
const jwtModule = JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '4h'}
})

@Module({
    imports:[UserModule, passportModule, jwtModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [passportModule, jwtModule]
})
export class AuthModule{}