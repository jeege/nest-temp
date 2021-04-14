import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomLogger } from 'src/interfaces/logger.interface';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TansformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private readonly logger: CustomLogger) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ) : Observable<Response<T>> {
        return next.handle().pipe(map(data => {
            const ctx = context.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            // 请求路由
            const url = request.originalUrl; 
            const code = response.statusCode;
            const res = {
                code,
                msg: '请求成功',
                success: true,
                data,
            };
            this.logger.info(`请求成功：${url} body: ${request.body ? JSON.stringify(request.body) : '{}'}`);
            return res
        }))
    }
}