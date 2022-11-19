import { Module } from '@nestjs/common';
import { TopMoviesService } from './top-movies.service';
import { TopMoviesController } from './top-movies.controller';

@Module({
  controllers: [TopMoviesController],
  providers: [TopMoviesService]
})
export class TopMoviesModule {}
