

import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonPorps {
  movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonPorps> = ({ movieId }) => {
  return (
    <div 
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <AiOutlinePlus className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" size={25}/>
    </div>
  )
}

export default FavoriteButton