"use server";

import { without } from 'lodash';
import prismadb from '~/lib/prismadb';
import serverAuth from '~/lib/serverAuth';

export async function fetchRandomMovie() {
  // await serverAuth();

  const movieCount = await prismadb.movie.count()
  const randomIndex = Math.floor(Math.random() * movieCount)
  const randomMovies = await prismadb.movie.findMany({
    take: 1,
    skip: randomIndex
  })
  console.log('randomMovies[0]: ', randomMovies[0]);
  return randomMovies[0];
}

export async function fetchMovieById(movieId: string) {
  // await serverAuth();

  if (typeof movieId !== 'string') {
    throw new Error('Invalid Id');
  }

  if (!movieId) {
    throw new Error('Missing Id');
  }

  const movies = await prismadb.movie.findUnique({
    where: {
      id: movieId
    }
  });

  return movies;
}

export async function fetchMovieList() {
  // await serverAuth();

  const movies = await prismadb.movie.findMany();

  return movies;
}

export async function fetchAddFavoriteMovie(movieId: string) {
  const { currentUser } = await serverAuth();

  const existingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if(!existingMovie){
    throw new Error("Invalid ID")
  }

  const user = await prismadb.user.update({
    where: {
      email: currentUser.email || '',
    },
    data: {
      favoriteIds: {
        push: movieId
      }
    }
  });

  return user;
}

export async function fetchDeleteFavoriteMovie(movieId: string) {
  const { currentUser } = await serverAuth();

  const existingMovie = await prismadb.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if(!existingMovie){
    throw new Error("Invalid ID")
  }

  const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

  const updatedUser = await prismadb.user.update({
    where: {
      email: currentUser.email || '',
    },
    data: {
      favoriteIds: updatedFavoriteIds,
    }
  });

  return updatedUser;
}

export async function fetchFavoriteMovies() {
  const { currentUser } = await serverAuth();

  const favoriteMovies = await prismadb.movie.findMany({
    where: {
      id: {
        in: currentUser?.favoriteIds
      },
    },
  });

  return favoriteMovies;
}