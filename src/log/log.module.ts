import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LogService } from './log.service';
import { LoggerMiddleware } from './log.middleware';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LogService],
})
export class LogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
