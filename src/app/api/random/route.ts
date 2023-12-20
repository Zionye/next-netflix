import { NextResponse } from 'next/server';

import prismadb from '~/lib/prismadb';
// import serverAuth from '~/lib/serverAuth';

export async function GET(request: Request) {
  // const session = await serverAuth(request)

  const movieCount = await prismadb.movie.count()
  const randomIndex = Math.floor(Math.random() * movieCount)
  const randomMovies = await prismadb.movie.findMany({
    take: 1,
    skip: randomIndex
  })
  return NextResponse.json(randomMovies[0], {status: 200});
}