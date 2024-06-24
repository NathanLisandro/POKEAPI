import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Connection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const [result] = await this.connection.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [createUserDto.username, hashedPassword],
    );
    return result;
  }

  async findAll() {
    const [rows] = await this.connection.query('SELECT * FROM users');
    return rows;
  }

  async findOne(id: number) {
    const [rows] = await this.connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const [result] = await this.connection.execute(
      'UPDATE users SET username = ?, password = ? WHERE id = ?',
      [updateUserDto.username, hashedPassword, id],
    );
    return result;
  }

  async remove(id: number) {
    const [result] = await this.connection.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
  }

  async findByUsername(username: string) {
    const [rows] = await this.connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }
}
