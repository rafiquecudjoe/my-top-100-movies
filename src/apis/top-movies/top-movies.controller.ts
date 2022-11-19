import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
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

import { CreateTopMovieDto } from './dto/top-movie.dto';
import { TopMoviesService } from './top-movies.service';

@ApiTags('Top Movies')
@Controller('api/v1/customer/:userId/top-movies')
export class TopMoviesController {
  constructor(private readonly topMoviesService: TopMoviesService) { }

  @Post('/')
  @ApiOperation({
    summary:
      'Used to add a top movie',
  })
  @ApiCreatedResponse({ description: 'Top Movie successfully added', type: ResponseWithData, })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: a movie with same title and release date already exist', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async addMovie(@Body() requestBody: CreateTopMovieDto,@Param('userId') userId:number, @Res() res: Response) {
    const response: ResponseWithData = await this.topMoviesService.addTopMovie(requestBody,userId);

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
  async retriveAllMovies(@Param('userId') userId:number ,@Res() res: Response) {
    const response: ResponseWithData = await this.topMoviesService.retrieveTopMovies(userId);

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
