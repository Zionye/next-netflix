"use client"
import Navbar from "~/components/Navbar"
import Billboard from "~/components/Billboard"
import MovieList, { type MovieListProps } from "~/components/MovieList"
import { useEffect, useState } from "react";
import { fetchMovieList, fetchFavoriteMovies } from "~/actions/movie";

export default function Home() {
  const [movies, setMovies] = useState<MovieListProps['data']>([]);
  const [favorites, setFavorites] = useState<MovieListProps['data']>([])

  async function startFetching() {
    const promiseAll = [await fetchMovieList(), await fetchFavoriteMovies()];
    const data = await Promise.all(promiseAll);
    console.log('promiseAll data: ', data);

    setMovies(data[0])
    setFavorites(data[1])
  }
  useEffect(() => {
    startFetching()
  }, [])
  
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40" >
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
