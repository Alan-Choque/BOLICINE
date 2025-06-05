import React from 'react'
import MovieCard from './movieCard'

const movies =[
  {
    id: 15,
    title: 'The thunderbolts',
    description: 'Description for Movie 1',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 21,
    title: 'Lilo and stich',
    description: 'Description for Movie 2',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 25,
    title: 'Destino final',
    description: 'Description for Movie 3',
    imageUrl: 'https://via.placeholder.com/150'
  }
]
const CarruselPeliculas = () => {
  return (
    <div className="py-4">
      <div className="flex overflow-x-auto space-x-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            description={movie.description}
            imageUrl={movie.imageUrl}
            href={`/cine/movies/${movie.id}`}>
          </MovieCard>
        ))}
        <div className="absolute justify-between mt-34 flex w-full">
          <button className="bg-gray-500 text-white rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <button className="bg-gray-500 text-white rounded-lg hover:bg-blue-600 ml-2">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarruselPeliculas