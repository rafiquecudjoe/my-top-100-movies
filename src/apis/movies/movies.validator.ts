import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithoutData } from '../../common/entities/response.entity';
import { JoiValidator } from '../../utils/joi.validator';
import { Response } from '../../common/response';
import * as joi from 'joi';
import { CreateMoviesDto, UpdateMoviesDto} from './dto/movies.dto';
import { MoviesRepository } from './movies.repository';;
import { Movies } from '@prisma/client';

@Injectable()
export class MoviesValidator {
    constructor(private readonly moviesRepository: MoviesRepository) { }

    validateCreateMovie(params: CreateMoviesDto): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {
                // joi validation
                const joiSchema = joi.object({
                    adult: joi.boolean().required().label('Adult'),
                    originalLanguage: joi.string().required().label('Original Language'),
                    title: joi.string().required().label('Title'),
                    overview: joi.string().required().label('Overview'),
                    originalTitle: joi.string().required().label('Original Title'),
                    releaseDate: joi.string().required().label('Release Date'),

                });
                const joiValidationResults = JoiValidator.validate(joiSchema, params);

                // check the results from joi validation
                if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

                // check for duplicate movies
                const foundMovie: Movies = await this.moviesRepository.retrieveMovieByTitleAndReleaseDate(params.title,params.releaseDate);
                if (foundMovie)
                    return resolve(Response.withoutData(HttpStatus.CONFLICT, 'A movie with this title and Release date already exists'));

                // success
                resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
            } catch (error) {
                reject(error);
            }
        });
    }

    validateUpdateMovie(params: UpdateMoviesDto,movieId:number): Promise<ResponseWithoutData> {
        return new Promise(async (resolve, reject) => {
            try {
                // joi validation
                const joiSchema = joi.object({
                    adult: joi.boolean().label('Adult'),
                    originalLanguage: joi.string().label('Original Language'),
                    title: joi.string().label('Title'),
                    overview: joi.string().label('Overview'),
                    originalTitle: joi.string().label('Original Title'),
                    releaseDate: joi.string().label('Release Date'),

                });
                const joiValidationResults = JoiValidator.validate(joiSchema, params);

                // check the results from joi validation
                if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

                // check if movie exists
                const foundClient = await this.moviesRepository.retrieveMovieById(movieId);
                if (!foundClient)
                    return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, 'Movie does not exist'));

                // success
                resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
            } catch (error) {
                reject(error);
            }
        });
    }
}
