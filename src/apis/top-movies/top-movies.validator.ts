import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithoutData } from '../../common/entities/response.entity';
import { JoiValidator } from '../../utils/joi.validator';
import { Response } from '../../common/response';
import * as joi from 'joi';
import { CreateTopMovieDto} from './dto/top-movie.dto';
import { TopMovies } from '@prisma/client';
import { TopMoviesRepository } from './top-movies.repository';
import { MoviesRepository } from '../movies/movies.repository';

@Injectable()
export class TopMoviesValidator {
    constructor(private readonly topMoviesRepository: TopMoviesRepository,
        private readonly moviesRepository: MoviesRepository
    ) { }

    validateAddTopMovie(params: CreateTopMovieDto,userId:number): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {
                // joi validation
                const joiSchema = joi.object({
                    movieId: joi.number().required().label('Top Movie Id'),
                    rank: joi.number().required().label('Title'),
                    favourite: joi.boolean().required().label('Favourite'),
                });

                const joiValidationResults = JoiValidator.validate(joiSchema, params);

                // check the results from joi validation
                if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

                // check if movie exists
                const foundMovie: TopMovies = await this.moviesRepository.retrieveMovieById(params.movieId);
                if (!foundMovie)
                    return resolve(Response.withoutData(HttpStatus.NOT_FOUND, 'Movie does not exist'));

                // check for duplicate top movies
                const foundTopMovie :TopMovies = await this.topMoviesRepository.retrieveTopMovies(params.movieId);

                if (foundTopMovie)
                    return resolve(Response.withoutData(HttpStatus.CONFLICT, 'This movie already exists'));

                // success
                resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
            } catch (error) {
                reject(error);
            }
        });
    }

}
