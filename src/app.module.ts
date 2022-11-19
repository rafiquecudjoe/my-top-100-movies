import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { MoviesModule } from './apis/movies/movies.module';
import { TopMoviesModule } from './apis/top-movies/top-movies.module';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot(), AuthModule, MoviesModule, TopMoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } 
