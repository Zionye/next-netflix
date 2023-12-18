"use client"
import Navbar from "~/components/Navbar"
import Billboard from "~/components/Billboard"
import MovieList, { type MovieListProps } from "~/components/MovieList"
import { useEffect, useState } from "react";
import { fetchMovieList } from "~/actions/movie";

export default function Home() {
  const [movies, setMovies] = useState<MovieListProps['data']>([]);

  async function startFetching() {
    const data = await fetchMovieList()
    setMovies(data)
    console.log('randomMovie: ', data);
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
      </div>
    </>
  )
}
