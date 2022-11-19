import { Injectable } from '@nestjs/common';
// import prisma from '../../common/prisma';
import { CreateTopMovieDto } from './dto/top-movie.dto';
import { ITopMoviesRepository } from './interface/top-movie.interface';

@Injectable()
export class TopMoviesRepository implements ITopMoviesRepository {
    saveTopMovie(params: CreateTopMovieDto): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // save top movie

                // const result = await prisma

                // await prisma.

                // await prisma.topMovies.create({
                
                // // save user
                // const result = await prisma.create({
                //     data: {
                //         adult: params.adult,
                //         originalLanguage: params.originalLanguage,
                //         originalTitle: params.originalTitle,
                //         overview: params.overview,
                //         releaseDate: new Date(params.releaseDate),
                //         title: params.title,
                //     },
                // });

                // success
                resolve("hello");
            } catch (error) {
                reject(error);
            }
        });
    }

    retrieveTopMovies(userId:number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // // save user
                // const result = await prisma.movies.create({
                //     data: {
                //         adult: params.adult,
                //         originalLanguage: params.originalLanguage,
                //         originalTitle: params.originalTitle,
                //         overview: params.overview,
                //         releaseDate: new Date(params.releaseDate),
                //         title: params.title,
                //     },
                // });

                // success
                resolve("result");
            } catch (error) {
                reject(error);
            }
        });
    }

}
