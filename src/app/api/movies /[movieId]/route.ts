import { NextResponse } from 'next/server';

import prismadb from '~/lib/prismadb';
// import serverAuth from '~/lib/serverAuth';

export async function GET(request: Request) {
  // const session = await serverAuth(request)

  const body = request.body;
  console.log('body: ', body);

  // if (typeof movieId !== 'string') {
  //   return NextResponse.json('Invalid Id');
  // }

  // if (!movieId) {
  //   return NextResponse.json('Missing Id');
  // }

  // const movies = await prismadb.movie.findUnique({
  //   where: {
  //     id: movieId
  //   }
  // });

  // return NextResponse.json({ movies },{ status: 200 });
}