
"use client"
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { fetchAddFavoriteMovie, fetchDeleteFavoriteMovie } from '~/actions/movie';
import { getSelf } from '~/actions/user';

export interface FavoriteButtonPorps {
  movieId: string | undefined;
}
const FavoriteButton: React.FC<FavoriteButtonPorps> = ({ movieId }) => {
  const currentUser = useRef<{}>()
  async function startFetching() {
    const data = await getSelf()
    currentUser.current = data
  }
  useEffect(()=>{
    startFetching()
  },[])

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    console.log('self: ', currentUser);
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if(isFavorite){
      response = await fetchDeleteFavoriteMovie(movieId)
    } else {
      response = await fetchAddFavoriteMovie(movieId)
    }

    // const updatedFavoriteIds = response?.data?.favoriteIds
  }, [isFavorite, movieId])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div 
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" size={25}/>
    </div>
  )
}

export default FavoriteButton