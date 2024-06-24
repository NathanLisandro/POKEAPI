import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from './log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logService: LogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const responseTime = Date.now() - start;
      this.logService.create({
        route: req.url,
        method: req.method,
        responseTime,
      });
    });
    next();
  }
}
