// src/log/log.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class LogService {
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {}

  async create(log: { route: string; method: string; responseTime: number }) {
    const [result] = await this.connection.execute(
      'INSERT INTO logs (route, method, responseTime) VALUES (?, ?, ?)',
      [log.route, log.method, log.responseTime],
    );
    return result;
  }
}
