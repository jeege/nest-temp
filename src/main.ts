import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.';
import { TansformInterceptor } from './common/interceptors/transform.interceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.enableCors();
  app.useLogger(nestWinston)
  app.useGlobalFilters(new HttpExceptionFilter(nestWinston.logger))
  app.useGlobalInterceptors(new TansformInterceptor(nestWinston.logger))
  await app.listen(3000);
}
bootstrap();
