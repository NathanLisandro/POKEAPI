import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PokemonController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    jwtToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pokemon/import (POST)', () => {
    return request(app.getHttpServer())
      .post('/pokemon/import')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201);
  });

  it('/pokemon (POST)', () => {
    return request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' })
      .expect(201);
  });

  it('/pokemon (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('/pokemon/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('/pokemon/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/pokemon/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon/26/' })
      .expect(200);
  });

  it('/pokemon/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/pokemon/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
