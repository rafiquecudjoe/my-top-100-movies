import { HttpStatus, Injectable } from '@nestjs/common';
// import { Movies } from '@prisma/client';
import { ResponseWithData, } from 'src/common/entities/response.entity';
import logger from '../../utils/logger';
// import { UpdateMoviesDto, CreateMoviesDto } from './dto/movies.dto';
import { Response } from '../../common/response';
import { Constants } from '../../common/enums/constants.enum';
import { CreateTopMovieDto } from './dto/top-movie.dto';


@Injectable()
export class TopMoviesService {
  constructor(
    // private readonly moviesValidator: MoviesValidator,
    // private readonly moviesRepository: MoviesRepository,
  ) { }
  async addTopMovie(createTopMovieDto: CreateTopMovieDto): Promise<ResponseWithData> {
    try {
      // validate payload
      // const validationResults = await this.moviesValidator.validateCreateMovie(createMovieDto);
      // if (validationResults.status !== HttpStatus.OK) return validationResults;

      // save movie
      // const data: Movies = await this.moviesRepository.saveMovie(createMovieDto);

      // success
      return Response.withData(HttpStatus.CREATED, "Movie successfully added", "data");
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }


  async retrieveTopMovies(userId:number): Promise<ResponseWithData> {
    try {
      // save movie
      // const data: Movies[] = await this.moviesRepository.retrieveAllMovies();

      // if (data.length === 0) return Response.withoutData(HttpStatus.NOT_FOUND, "No movies found");

      // success
      return Response.withData(HttpStatus.OK, "Movies Retrieved Successfully", "data");
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

}
