"use server";

import prismadb from '~/lib/prismadb';

export async function fetchRandomMovie() {
  const movieCount = await prismadb.movie.count()
  const randomIndex = Math.floor(Math.random() * movieCount)
  const randomMovies = await prismadb.movie.findMany({
    take: 1,
    skip: randomIndex
  })
  console.log('randomMovies[0]: ', randomMovies[0]);
  return randomMovies[0];
}