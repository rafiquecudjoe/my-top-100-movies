import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { TopMoviesModule } from '../top-movies.module';
import { TopMoviesRepository } from '../top-movies.repository';

describe('Testing Top Movies Controller', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await new TopMoviesRepository().deleteAll();

        const moduleRef = await Test.createTestingModule({
            imports: [TopMoviesModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });


    describe('POST api/v1/customer/:userId/top-movies', () => {

        it('checks if top movies were successfully saved', async () => {
            const requestBody = {
                movieId: 0,
                rank: 5,
                favourite: true,
            };

            const response = await supertest(app.getHttpServer()).post('api/v1/customer/1/top-movies').send(requestBody);

            expect(response.status).toEqual(201);
            expect(response.body).toBeDefined();

        });
    });
    describe('GET api/v1/customer/:userId/top-movies', () => {
        it('checks if top movies are retrieved', async () => {

            const response = await supertest(app.getHttpServer()).get("api/v1/customer/1/top-movies").send();

            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
        });
    })
});
