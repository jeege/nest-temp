import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    // 请求路由
    // const url = request.originalUrl; 
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      // 错误信息
    const msg = exception.message; 

    const errorResponse = {
      code: status,
      msg,
      success: false,
      data: null,
    };

    response
      .status(status)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(errorResponse);
    // errorLogger.error(url, errorResponse);

  }
}