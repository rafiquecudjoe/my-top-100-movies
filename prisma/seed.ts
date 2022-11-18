import { PrismaClient } from '@prisma/client';
const axios = require('axios');
import logger from '../src/utils/logger';

const prisma = new PrismaClient();

async function main() {
    try {
        const page1 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=1')

        const movies = page1.data.results;

        const filteredMovies = movies.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

         await prisma.movies.createMany({
            data: filteredMovies,
            skipDuplicates: true,
         })
        
        const page2 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=2')

        const movies2 = page2.data.results;

        const filteredMovies2 = movies2.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies2,
            skipDuplicates: true,
        })

        const page3 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=3')

        const movies3 = page3.data.results;

        const filteredMovies3 = movies3.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies3,
            skipDuplicates: true,
        })

        const page4 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=4')

        const movies4 = page4.data.results;

        const filteredMovies4 = movies4.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies4,
            skipDuplicates: true,
        })

        const page5 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=5')

        const movies5 = page5.data.results;

        const filteredMovies5 = movies5.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies5,
            skipDuplicates: true,
        })

        const page6 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=7')

        const movies6 = page6.data.results;

        const filteredMovies6 = movies6.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies6,
            skipDuplicates: true,
        })

        const page7 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=8')

        const movies7 = page7.data.results;

        const filteredMovies7 = movies7.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies7,
            skipDuplicates: true,
        })

        const page8 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=9')

        const movies8 = page8.data.results;

        const filteredMovies8 = movies8.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies8,
            skipDuplicates: true,
        })

        const page9 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=10')

        const movies9 = page9.data.results;

        const filteredMovies9 = movies9.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies9,
            skipDuplicates: true,
        })


        const page10 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=11')

        const movies10 = page10.data.results;

        const filteredMovies10 = movies10.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies10,
            skipDuplicates: true,
        })


        const page11 = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e63e39b590c2f3e222b24ea73c3c792d&language=en-US&page=12')

        const movies11 = page11.data.results;

        const filteredMovies11 = movies11.map((movie: any) => {
            return {
                adult: movie.adult,
                originalLanguage: movie.original_language,
                originalTitle: movie.original_title,
                overview: movie.overview,
                releaseDate: new Date(movie.release_date),
                title: movie.title,
            }
        })

        await prisma.movies.createMany({
            data: filteredMovies11,
            skipDuplicates: true,
        })

    } catch (error) {
        logger.error(`An error occurred while seeding the database: ${error}`);
    }
}

main()
    .catch(e => {
        logger.error(`An error occurred while seeeding data: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });