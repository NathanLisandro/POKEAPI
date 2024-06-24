import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
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

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ username: 'newuser', password: 'newpassword' })
      .expect(201);
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('/user/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ username: 'updateduser', password: 'updatedpassword' })
      .expect(200);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
