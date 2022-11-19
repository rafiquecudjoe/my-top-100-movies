import { Test, TestingModule } from '@nestjs/testing';
import { ResponseWithData } from '../../../common/entities/response.entity';
import { AuthService } from '../auth.service';
import { AuthRepository } from '../auth.repository';
import { AuthValidator } from '../../auth/auth.validator';

describe('Testing Auth Service', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, AuthValidator, AuthRepository],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    beforeAll(async () => {
        await new AuthRepository().deleteAll();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should check if email is empty', async () => {
        const data: ResponseWithData = await service.createUser({
            email: '',
            username: "rafiqueTest",
            password: 'Flipper123',
            sex: 'male',
            fullName: "Rafiqueacudjoe" });

        expect(data.status).toEqual(400);
        expect(data.message).toEqual('Email is not allowed to be empty');
    });

    it('should save signup details successfully', async () => {
        const data: ResponseWithData = await service.createUser({
            email: 'rasgalazy6',
            username: "rafiqueTest",
            password: 'Flipper123',
            sex: 'male',
            fullName: "Rafiqueacudjoe" });

        expect(data.status).toEqual(201);
        expect(data.message).toEqual("Signup Successfull");
    });

    it('should not save duplicate details for a user', async () => {
        const data: ResponseWithData = await service.createUser({
            email: 'rasgalazy6',
            username: "rafiqueTest",
            password: 'Flipper123',
            sex: 'male',
            fullName: "Rafiqueacudjoe" });

        expect(data.status).toEqual(409);
        expect(data.message).toEqual('A user with this username already exists');
    });
});
