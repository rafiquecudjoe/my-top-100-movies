import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesValidator } from './movies.validator';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService,MoviesRepository,MoviesValidator]
})
export class MoviesModule {}
