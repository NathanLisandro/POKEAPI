import { Injectable, Inject } from '@nestjs/common';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Connection } from 'mysql2/promise';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    @Inject('DATABASE_CONNECTION') private connection: Connection,
    private httpService: HttpService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const [result] = await this.connection.execute(
      'INSERT INTO pokemon (name, url) VALUES (?, ?)',
      [createPokemonDto.name, createPokemonDto.url],
    );
    return result;
  }

  async findAll() {
    const [rows] = await this.connection.query('SELECT * FROM pokemon');
    return rows;
  }

  async findOne(id: number) {
    const [rows] = await this.connection.execute('SELECT * FROM pokemon WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    const [result] = await this.connection.execute(
      'UPDATE pokemon SET name = ?, url = ? WHERE id = ?',
      [updatePokemonDto.name, updatePokemonDto.url, id],
    );
    return result;
  }

  async remove(id: number) {
    const [result] = await this.connection.execute('DELETE FROM pokemon WHERE id = ?', [id]);
    return result;
  }

  async fetchAndSavePokemons() {
    const response = await firstValueFrom(this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=50'));
    const pokemons = response.data.results;

    for (const poke of pokemons) {
      await this.connection.execute(
        'INSERT INTO pokemon (name, url) VALUES (?, ?)',
        [poke.name, poke.url],
      );
    }
  }
}
