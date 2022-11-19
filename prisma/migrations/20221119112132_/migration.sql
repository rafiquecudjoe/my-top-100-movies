-- AddForeignKey
ALTER TABLE "top_movies" ADD CONSTRAINT "top_movies_top_movie_id_fkey" FOREIGN KEY ("top_movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
