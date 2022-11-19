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
                    movieId: joi.number().required().label('MovieId'),
                    rank: joi.number().positive().greater(0).required().label('Rank'),
                    favourite: joi.boolean().required().label('Favourite'),
                });

                const joiValidationResults = JoiValidator.validate(joiSchema, params);

                // check the results from joi validation
                if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

                // check if movie exists
                const foundMovie: TopMovies = await this.moviesRepository.retrieveMovieById(params.movieId);
                if (!foundMovie)
                    return resolve(Response.withoutData(HttpStatus.NOT_FOUND, 'Movie does not exist in movie database'));

                // check for duplicate top movies for user
                const foundTopMovie: TopMovies[] = await this.topMoviesRepository.retrieveTopMovies(userId);

                if (foundTopMovie.length > 0)
                    return resolve(Response.withoutData(HttpStatus.CONFLICT, 'This movie already exists in your top movies'));

                // success
                resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
            } catch (error) {
                reject(error);
            }
        });
    }

}
