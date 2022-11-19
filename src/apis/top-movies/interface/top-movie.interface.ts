
import { CreateTopMovieDto } from "../dto/top-movie.dto";

export interface ITopMoviesRepository {
    saveTopMovie(params: CreateTopMovieDto): Promise<any>;
    retrieveTopMovies(userId:number): Promise<any>;
}
