import { Injectable } from '@nestjs/common';
import prisma from '../../common/prisma';
import { CreateMoviesDto } from './dto/movies.dto';
import { IMoviesRepository } from './interfaces/movies.interface';

@Injectable()
export class MoviesRepository implements IMoviesRepository {
    saveMovie(params: CreateMoviesDto): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // save user
                const result = await prisma.movies.create({
                    data: {
                        adult: params.adult,
                        originalLanguage: params.originalLanguage,
                        originalTitle: params.originalTitle,
                        overview: params.overview,
                        releaseDate: new Date(params.releaseDate),
                        title: params.title,
                    },
                });

                // success
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    retrieveMovieById(movieId: number,): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // retrieve user
                const foundMovie = await prisma.movies.findFirst({
                    where: {
                        id: Number(movieId),
                    }
                })
                // success
                resolve(foundMovie);
            } catch (error) {
                reject(error);
            }
        });
    }

    retrieveMovieByTitleAndReleaseDate(title: string, releaseDate: Date): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // retrieve user
                const foundMovie = await prisma.movies.findFirst({
                    where: {
                        title: title,
                        releaseDate: new Date(releaseDate),
                    }
                })
                // success
                resolve(foundMovie);
            } catch (error) {
                reject(error);
            }
        });
        
    }

    retrieveAllMovies(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // retrieve user
                const foundMovies = await prisma.movies.findMany()
                // success
                resolve(foundMovies);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateMovie(movieId: number, params: CreateMoviesDto): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // update user
                const updatedMovie = await prisma.movies.update({
                    where: {
                        id: Number(movieId),
                    },
                    data: {
                        adult: params.adult,
                        originalLanguage: params.originalLanguage,
                        originalTitle: params.originalTitle,
                        overview: params.overview,
                        releaseDate: new Date(params.releaseDate),
                        title: params.title,
                    },
                })
                // success
                resolve(updatedMovie);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteMovie(movieId: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // delete user
                const deletedMovie = await prisma.movies.delete({
                    where: {
                        id: Number(movieId),
                    },
                })
                // success
                resolve(deletedMovie);
            } catch (error) {
                reject(error);
            }
        });
    }

}
