import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.';
import { TansformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TansformInterceptor())
  await app.listen(3000);
}
bootstrap();
