
"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { fetchAddFavoriteMovie, fetchDeleteFavoriteMovie } from '~/actions/movie';
import { getSelf } from '~/actions/user';
import { UserProps } from '~/global'

export interface FavoriteButtonPorps {
  movieId: string | undefined;
}
const FavoriteButton: React.FC<FavoriteButtonPorps> = ({ movieId }) => {
  const [currentUser, setCurrentUser] = useState<UserProps| null>(null)
  const [updatedFavoriteIds, setUpdatedFavoriteIds] = useState<string[] | null>(null)

  const startFetching =  useCallback(async () => {
    const data = await getSelf()
    if(data) setCurrentUser(data)
  }, []);
  useEffect(()=>{
    startFetching()
  },[startFetching])

  const isFavorite = useMemo(() => {

    const list = currentUser?.favoriteIds || [];

    console.log('self: ', list);
    return list.includes(movieId as string);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if(isFavorite){
      response = await fetchDeleteFavoriteMovie(movieId as string)
    } else {
      response = await fetchAddFavoriteMovie(movieId as string)
    }

    setUpdatedFavoriteIds(response?.favoriteIds)
    const copyUser = Object.assign({}, currentUser)
    copyUser.favoriteIds = response?.favoriteIds
    setCurrentUser(copyUser)
  }, [isFavorite, movieId, currentUser, setUpdatedFavoriteIds, setCurrentUser])

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