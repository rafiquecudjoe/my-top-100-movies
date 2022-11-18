import { HttpStatus, Injectable } from '@nestjs/common';
import { Movies } from '@prisma/client';
import { ResponseWithData, ResponseWithoutData } from 'src/common/entities/response.entity';
import logger from 'src/utils/logger';
import { UpdateMoviesDto, CreateMoviesDto } from './dto/movies.dto';
import { MoviesRepository } from './movies.repository';
import { MoviesValidator } from './movies.validator';
import { Response } from 'src/common/response';
import { Constants } from 'src/common/enums/constants.enum';


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
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }


  async retrieveAllMovies(): Promise<ResponseWithData> {
    try {
      // save movie
      const data: Movies[] = await this.moviesRepository.retrieveAllMovies();

      if (data.length === 0) return Response.withoutData(HttpStatus.NOT_FOUND, "No movies found");

      // success
      return Response.withData(HttpStatus.CREATED, "Movies Retrieved Successfully", data);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

  async retrieveMovieById(movieId: number): Promise<ResponseWithData> {
    try {
      // Retrieve movie
      const data: Movies = await this.moviesRepository.retrieveMovieById(movieId);
      if (!data) return Response.withoutData(HttpStatus.NOT_FOUND, "Movie not found");

      // success
      return Response.withData(HttpStatus.CREATED, "Movies Retrieved Successfully", data);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
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
      return Response.withoutData(HttpStatus.CREATED, "Movie Updated  Successfully",);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }

  async deleteMovie(id: number): Promise<ResponseWithoutData> {
    try {
      // Delete Movie
      await this.moviesRepository.deleteMovie(id);

      // success
      return Response.withoutData(HttpStatus.CREATED, "Movie removed successfully",);
    } catch (error) {
      logger.error(`An error occurred while creating user: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }
}
