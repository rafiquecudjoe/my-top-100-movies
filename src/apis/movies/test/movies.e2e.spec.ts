import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { MoviesModule } from '../movies.module';
import { MoviesRepository } from '../movies.repository';

describe('ApiClientController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await new MoviesRepository().deleteAll();

        const moduleRef = await Test.createTestingModule({
            imports: [MoviesModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    let id : number;

    describe('POST api/v1/movies', () => {
        it('checks if original language was submitted', async () => {
            const requestBody = {
                adult: true,
                originalLanguage: "",
                title: "test",
                overview: "Hi this is a test overview",
                originalTitle: "hello",
                releaseDate: "01-01-2021",
            };

            const response = await supertest(app.getHttpServer()).post('/api/v1/movies').send(requestBody);

            expect(response.status).toEqual(400);
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual('Original Language is not allowed to be empty');
        });

        it('checks if client details are generated successfully', async () => {
            const requestBody = {
                adult: true,
                originalLanguage: "en",
                title: "testgggg",
                overview: "Hi this is a test overview",
                originalTitle: "hello",
                releaseDate: "01-01-2021",
            };

            const response = await supertest(app.getHttpServer()).post('/api/v1/movies').send(requestBody);

            expect(response.status).toEqual(201);
            expect(response.body).toBeDefined();
            id = response.body.data.id;
         

        });
    });
    describe('GET api/v1/movies', () => {
        it('checks if movies are retrieved', async () => {

            const response = await supertest(app.getHttpServer()).get(`/api/v1/movies/${id}`).send();

            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
        });
    })
  ;
    describe('GET api/v1/movies', () => {

        it('checks if all movies are retrived successfully', async () => {
         
            const response = await supertest(app.getHttpServer()).get('/api/v1/movies').send();

            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
        });
    });
    describe('PATCH api/v1/movies/"movieId', () => {
        it('checks if movie was patched was successful', async () => {
            const requestBody = {
            adult:false
            };

            const response = await supertest(app.getHttpServer()).patch(`/api/v1/movies/${id}`).send(requestBody);

            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
        });

    });
    describe('DELETE api/v1/movies/:movieId', () => {
        it('checks if movie was deleted', async () => {
      
            const response = await supertest(app.getHttpServer()).delete(`/api/v1/movies/${id}`).send();

            expect(response.status).toEqual(200);
        });
    });
});
