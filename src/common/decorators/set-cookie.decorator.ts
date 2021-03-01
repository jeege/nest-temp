import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SetHeader = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const res = ctx.switchToHttp().getResponse()
        return function(key, value) {
            res.set(key, value)
        }
    }
)