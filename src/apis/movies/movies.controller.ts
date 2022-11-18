import { Controller, Post, Body, Res, Get, Patch, Delete, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseWithData, ResponseWithoutData } from '../../common/entities/response.entity';

import { MoviesService } from './movies.service';
import { CreateMoviesDto,UpdateMoviesDto } from './dto/movies.dto';
import { SignupDto } from '../auth/dto/auth.dto.';

@ApiTags('Movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post('/')
  @ApiOperation({
    summary:
      'Used to add a movie',
  })
  @ApiCreatedResponse({ description: 'Movie successfully added', type: ResponseWithData, })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: a movie with same title and release date already exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async addMovie(@Body() requestBody: CreateMoviesDto, @Res() res: Response) {
    const response: ResponseWithData = await this.moviesService.addMovie(requestBody);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }

  @Get('')
  @ApiOperation({
    summary:
      'Used to Retrieve all movies',
  })
  @ApiCreatedResponse({ description: 'Movies Retrieved Successfully', type: ResponseWithData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async retriveAllMovies(@Res() res: Response) {
    const response: ResponseWithData = await this.moviesService.retrieveAllMovies();

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
  @Get('/:movieId')
  @ApiOperation({
    summary:
      'Used to retrived 1 movie',
  })
  @ApiCreatedResponse({ description: 'Movie retrieved successfully', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: Movie does not exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async retrieveMovie(@Param('movieId') movieId:number, @Res() res: Response) {
    const response: ResponseWithData = await this.moviesService.retrieveMovieById(movieId);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
  @Patch('/:movieId')
  @ApiOperation({
    summary:
      'Used to update a movie',
  })
  @ApiCreatedResponse({ description: 'movie udated successfully', type: SignupDto })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: movie does not exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async updateMovie(@Body() requestBody: UpdateMoviesDto, @Param('movieId') movieId: number,@Res() res: Response) {
    const response: ResponseWithData = await this.moviesService.updateMovie(movieId,requestBody);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
  @Delete('/:movieId')
  @ApiOperation({
    summary:
      'Used to delete a movie',
  })
  @ApiCreatedResponse({ description: 'movie deleted successfully', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: movie does not exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async deleteMovie(@Param('movieId') movieId: number, @Res() res: Response) {
    const response: ResponseWithData = await this.moviesService.deleteMovie(movieId);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
}
