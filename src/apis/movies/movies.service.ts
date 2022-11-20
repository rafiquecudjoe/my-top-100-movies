import { HttpStatus, Injectable } from '@nestjs/common';
import { Movies } from '@prisma/client';
import { ResponseWithData, ResponseWithoutData } from 'src/common/entities/response.entity';
import logger from '../../utils/logger';
import { UpdateMoviesDto, CreateMoviesDto } from './dto/movies.dto';
import { MoviesRepository } from './movies.repository';
import { MoviesValidator } from './movies.validator';
import { Response } from '../../common/response';
import { Constants } from '../../common/enums/constants.enum';


@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesValidator: MoviesValidator,
    private readonly moviesRepository: MoviesRepository,
  ) { }
  async addMovie(createMovieDto: CreateMoviesDto): Promise<ResponseWithData> {
    try {
      // validate payload
      const validationResults = await this.moviesValidator.validateCreateMovie(createMovieDto);
      if (validationResults.status !== HttpStatus.OK) return validationResults;
      
      // save movie
      const data: Movies = await this.moviesRepository.saveMovie(createMovieDto);

      // success
      return Response.withData(HttpStatus.CREATED, "Movie successfully added", data);
    } catch (error) {
      logger.error(`An error occurred adding movie: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }


  async retrieveAllMovies(): Promise<ResponseWithData> {
    try {
      // save movie
      const data: Movies[] = await this.moviesRepository.retrieveAllMovies();

      if (data.length === 0) return Response.withoutData(HttpStatus.NOT_FOUND, "No movies found");

      // success
      return Response.withData(HttpStatus.OK, "Movies Retrieved Successfully", data);
    } catch (error) {
      logger.error(`An error occurred while retrieving movie: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

  async retrieveMovieById(movieId: number): Promise<ResponseWithData> {
    try {
      // Retrieve movie
      const data: Movies = await this.moviesRepository.retrieveMovieById(movieId);
      if (!data) return Response.withoutData(HttpStatus.NOT_FOUND, "Movie not found");

      // success
      return Response.withData(HttpStatus.OK, "Movie Retrieved Successfully", data);
    } catch (error) {
      logger.error(`An error occurred while retrieving movie by Id: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

  async updateMovie(movieId: number, updateMovieDto: UpdateMoviesDto): Promise<ResponseWithoutData> {
    try {
      // validate payload
      const validationResults = await this.moviesValidator.validateUpdateMovie(updateMovieDto, movieId);
      if (validationResults.status !== HttpStatus.OK) return validationResults;

      // Update Movie
      await this.moviesRepository.updateMovie(movieId, updateMovieDto);


      // success
      return Response.withoutData(HttpStatus.OK, "Movie Updated  Successfully",);
    } catch (error) {
      logger.error(`An error occurred while updating movie: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

  async deleteMovie(id: number): Promise<ResponseWithoutData> {
    try {
      // check if movie exists
      const movie = await this.moviesRepository.retrieveMovieById(id);
      if (!movie) return Response.withoutData(HttpStatus.NOT_FOUND, "Movie not found");
      
      // Delete Movie
      await this.moviesRepository.deleteMovie(id);

      // success
      return Response.withoutData(HttpStatus.OK, "Movie removed successfully",);
    } catch (error) {
      logger.error(`An error occurred while deleting movie: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }
}
