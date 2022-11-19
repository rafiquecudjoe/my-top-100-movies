import { Module } from '@nestjs/common';
import { TopMoviesService } from './top-movies.service';
import { TopMoviesController } from './top-movies.controller';
import { TopMoviesValidator } from './top-movies.validator';
import { TopMoviesRepository } from './top-movies.repository';
import { MoviesRepository } from '../movies/movies.repository';

@Module({
  controllers: [TopMoviesController],
  providers: [TopMoviesService,TopMoviesValidator,TopMoviesRepository,MoviesRepository]
})
export class TopMoviesModule {}
