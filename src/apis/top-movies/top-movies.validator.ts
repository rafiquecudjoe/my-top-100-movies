import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithoutData } from '../../common/entities/response.entity';
import { JoiValidator } from '../../utils/joi.validator';
import { Response } from '../../common/response';
import * as joi from 'joi';
import { CreateTopMovieDto} from './dto/top-movie.dto';
import { TopMovies } from '@prisma/client';
import { TopMoviesRepository } from './top-movies.repository';

@Injectable()
export class TopMoviesValidator {
    constructor(private readonly topMoviesRepository: TopMoviesRepository) { }

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

                // check for duplicate top movies
                const foundMovie: TopMovies[] = await this.topMoviesRepository.retrieveTopMovies(params.movieId);

                if (foundMovie.length > 0)
                    return resolve(Response.withoutData(HttpStatus.CONFLICT, 'This movie already exists'));

                // success
                resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
            } catch (error) {
                reject(error);
            }
        });
    }

}
