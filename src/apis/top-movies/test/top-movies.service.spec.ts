import { Test, TestingModule } from '@nestjs/testing';
import { ResponseWithData } from '../../../common/entities/response.entity';
import { TopMoviesService } from '../top-movies.service';
import { TopMoviesRepository } from '../top-movies.repository';
import { TopMoviesValidator } from '../top-movies.validator';
import { MoviesRepository } from '../../../apis/movies/movies.repository';

describe('Testing Top Movies Service', () => {
    let service: TopMoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TopMoviesService, TopMoviesValidator, TopMoviesRepository,MoviesRepository],
        }).compile();

        service = module.get<TopMoviesService>(TopMoviesService);
    });

    beforeAll(async () => {
        await new MoviesRepository().deleteAll();
        await new TopMoviesRepository().deleteAll();
    });
    // let id: number;

    it('should check if rank is empty', async () => {
        const data: ResponseWithData = await service.addTopMovie({
            movieId:0 ,
            rank: 5,
            favourite: true
        }, 1);

        expect(data.status).toEqual(400);
        expect(data.message).toEqual('Title is not allowed to be empty');
    });

    it('should retrieve top movies successfully for a user', async () => {
        const data: ResponseWithData = await service.retrieveTopMovies(1);

        expect(data.status).toEqual(201);
        expect(data.message).toEqual("Movie successfully added");
    });
});
