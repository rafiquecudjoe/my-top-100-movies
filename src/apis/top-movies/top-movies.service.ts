import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithData, ResponseWithoutData, } from 'src/common/entities/response.entity';
import logger from '../../utils/logger';
import { Response } from '../../common/response';
import { Constants } from '../../common/enums/constants.enum';
import { CreateTopMovieDto } from './dto/top-movie.dto';
import { TopMoviesValidator } from './top-movies.validator';
import { TopMoviesRepository } from './top-movies.repository';
import { TopMovies } from '@prisma/client';
import { MoviesRepository } from '../movies/movies.repository';


@Injectable()
export class TopMoviesService {
  constructor(
    private readonly topMoviesValidator: TopMoviesValidator,
    private readonly topMoviesRepository: TopMoviesRepository,
    private readonly moviesRepository: MoviesRepository,
  ) { }
  async addTopMovie(createTopMovieDto: CreateTopMovieDto,userId:number): Promise<ResponseWithoutData> {
    try {
      // validate payload
      const validationResults = await this.topMoviesValidator.validateAddTopMovie(createTopMovieDto,userId);
      if (validationResults.status !== HttpStatus.OK) return validationResults;

      // save top movie
      await this.topMoviesRepository.saveTopMovie(createTopMovieDto,userId);

      // success
      return Response.withoutData(HttpStatus.CREATED, "Top Movie successfully added");
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }


  async retrieveTopMovies(userId:number): Promise<ResponseWithData> {
    try {
      // save movie review
      const data: TopMovies[] = await this.topMoviesRepository.retrieveTopMovies(userId);

      if (data.length === 0) return Response.withoutData(HttpStatus.NOT_FOUND, "No movies found");

      let movies = [];

      for (let i = 0; i < data.length; i++) {
        const movie = await this.moviesRepository.retrieveMovieById(data[i].topMovieId);
        // add rank to movie
        movie.rank = data[i].rank;

        // push to movies array
        movies.push(movie);
      }

      // sort movies by rank
      movies.sort((a, b) => a.rank - b.rank);

      // success
      return Response.withData(HttpStatus.OK, "Top Movies Retrieved Successfully", movies);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

}
