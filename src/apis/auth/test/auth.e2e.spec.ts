import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { AuthModule } from '../auth.module';
import { AuthRepository } from '../auth.repository';

describe('ApiClientController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        await new AuthRepository().deleteAll();

        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('POST api/v1/signup', () => {
        it('checks if email was submitted', async () => {
            const requestBody = {
                email: '',
                username:"rafiqueTest",
                password: 'Flipper123',
                sex: 'male',
                fullName:"Rafiqueacudjoe"
             };

            const response = await supertest(app.getHttpServer()).post('/api/v1/signup').send(requestBody);

            expect(response.status).toEqual(400);
            expect(response.body).toBeDefined();
            expect(response.body.message).toEqual('Email is not allowed to be empty');
        });

        it('checks if client details are generated successfully', async () => {
            const requestBody = { 
                email: 'rasgalazy5@gmail.com',
                username: "rafiqueTest",
                password: 'Flipper123',
                sex: 'male',
                fullName: "Rafiqueacudjoe"
            };

            const response = await supertest(app.getHttpServer()).post('/api/v1/signup').send(requestBody);

            expect(response.status).toEqual(201);
            expect(response.body).toBeDefined();
        });
    });
});
