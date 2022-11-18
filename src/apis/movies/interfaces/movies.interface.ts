import { CreateMoviesDto, UpdateMoviesDto } from "../dto/movies.dto";

export interface IMoviesRepository {
    saveMovie(params: CreateMoviesDto): Promise<any>;
    retrieveMovieById(movieId: number): Promise<any>;
    retrieveMovieByTitleAndReleaseDate(title: string,releaseDate:Date): Promise<any>;
    retrieveAllMovies(): Promise<any>;
    updateMovie(movieId: number,params:UpdateMoviesDto): Promise<any>;
    deleteMovie(movieId: number): Promise<any>;
}
