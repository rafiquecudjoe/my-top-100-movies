
import { CreateTopMovieDto } from "../dto/top-movie.dto";

export interface ITopMoviesRepository {
    saveTopMovie(params: CreateTopMovieDto,userId:number): Promise<any>;
    retrieveTopMovies(userId:number): Promise<any>;
}
