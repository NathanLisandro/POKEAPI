import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pokemonService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pokemonService.remove(id);
  }

  @Post('import')
  async importPokemons() {
    await this.pokemonService.fetchAndSavePokemons();
  }
}
