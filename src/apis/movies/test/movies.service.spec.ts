import { Test, TestingModule } from '@nestjs/testing';
import { ResponseWithData } from '../../../common/entities/response.entity';
import { MoviesService } from '../movies.service';
import { MoviesRepository } from '../movies.repository';
import { MoviesValidator } from '../movies.validator';

describe('Testing Movies Service', () => {
    let service: MoviesService;

 

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService, MoviesValidator, MoviesRepository],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    beforeAll(async () => {
        await new MoviesRepository().deleteAll();
    });
    let id: number;
 
    it('should check if title is empty', async () => {
        const data: ResponseWithData = await service.addMovie({
            adult: true,
            originalLanguage: "en",
            title: "",
            overview: "Hi this is a test overview",
            originalTitle: "hello",
            releaseDate: new Date("01-01-2021"),
        });

        expect(data.status).toEqual(400);
        expect(data.message).toEqual('Title is not allowed to be empty');
    });

    it('should save a movies successfully', async () => {
        const data: ResponseWithData = await service.addMovie({
            adult: true,
            originalLanguage: "en",
            title: "Test Movie",
            overview: "Hi this is a test overview",
            originalTitle: "hello",
            releaseDate: new Date("01-01-2021"),
        });

        expect(data.status).toEqual(201);
        expect(data.message).toEqual("Movie successfully added");
        id = data.data.id;
    });

    it('should not add duplicate movie', async () => {
        const data: ResponseWithData = await service.addMovie({
            adult: true,
            originalLanguage: "en",
            title: "Test Movie",
            overview: "Hi this is a test overview",
            originalTitle: "hello",
            releaseDate: new Date("01-01-2021"),
        });

        expect(data.status).toEqual(409);
        expect(data.message).toEqual('A movie with this title and Release date already exists');
    });
    it('should get all movies', async () => {
        const data: ResponseWithData = await service.retrieveAllMovies();

        expect(data.status).toEqual(200);
        expect(data.message).toEqual('Movies Retrieved Successfully');
    });
    it('should get a movie', async () => {
        const data: ResponseWithData = await service.retrieveMovieById(id);

        expect(data.status).toEqual(200);
        expect(data.message).toEqual('Movie Retrieved Successfully');
    });
    it('should patch a movie', async () => {
        const data: ResponseWithData = await service.updateMovie(id, {
            adult: false,
        });

        expect(data.status).toEqual(200);
        expect(data.message).toEqual('Movie Updated  Successfully');
    });
    it('should remove a movie', async () => {
        const data: ResponseWithData = await service.deleteMovie(id);

        expect(data.status).toEqual(200);
        expect(data.message).toEqual('Movie removed successfully');
    });
});
