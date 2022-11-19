import { Injectable } from '@nestjs/common';
import prisma from '../../common/prisma';
import { CreateTopMovieDto } from './dto/top-movie.dto';
import { ITopMoviesRepository } from './interface/top-movie.interface';

@Injectable()
export class TopMoviesRepository implements ITopMoviesRepository {
    saveTopMovie(params: CreateTopMovieDto,userId:number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // save top movie
                const result = await prisma.topMovies.create({
                    data: {
                        userId: Number(userId),
                        rank: params.rank,
                        topMovieId: params.movieId,
                    },
                });

                // success
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

    retrieveTopMovies(userId: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // retrieve top movie
                const result = await prisma.topMovies.findMany({
                    where: {
                        userId: Number(userId),
                    }
                });
                // success
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

}
