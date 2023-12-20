

"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModalStore from '~/store/useInfoModalStore';
import { fetchMovieById } from '~/actions/movie';
import { WatchProps } from "~/global";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}
const InfoModal: React.FC<InfoModalProps> = ({visible, onClose}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [movie, setMovie] = useState<WatchProps>()

  const { movieId } = useInfoModalStore()
  console.log('InfoModal movieId: ', movieId);

  // const startFetching = async ()=>{
  //   const data = await fetchMovieById(movieId)
  //   setMovie(data)
  // }
  const startFetching =  useCallback(async () => {
    if(movieId){
      const data = await fetchMovieById(movieId)
      if(data) setMovie(data)
    }
  }, [movieId]);

  useEffect(()=>{
    setIsVisible(true)
    if(isVisible){
      startFetching()
    }
  },[setIsVisible, startFetching, movieId, isVisible])
  
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setMovie(undefined);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">

      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">

        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

          <div className="relative h-96">
            <video poster={movie?.thumbnailUrl} autoPlay muted loop src={movie?.videoUrl} className="w-full brightness-[60%] object-cover h-full" />

            <div 
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
                <AiOutlineClose className="text-white w-6" size={20}/>
            </div>

            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={movie?.id} />
                <FavoriteButton movieId={movie?.id} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">
                New
              </p>
              <p className="text-white text-lg">
                {movie?.duration}
              </p>
              <p className="text-white text-lg">
                {movie?.genre}
              </p>
            </div>
            <p className="text-white text-lg">
              {movie?.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default InfoModal;