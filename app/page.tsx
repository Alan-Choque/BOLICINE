import MovieDetails from '../components/MovieDetails';

export default function Home() {
  const movieData = {
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // url del video esto se debe cambiar 
    titleOriginal: 'Destino Final: Lazos de Sangre',
    classification: 'C (18+ Adultos)',
    genre: 'Horror',
    director: 'Zach Lipovsky',
    actors: 'Richard Harmon, Terry Todd, Teo Briones',
    country: 'Estados Unidos',
    duration: '1h 50m',
    distributor: 'Warner Bros',
    showtimes: ['10:10 AM', '11:30 AM', '12:15 PM', '1:35 PM', '2:20 PM', '3:40 PM', '4:25 PM', '5:50 PM', '6:40 PM', '8:10 PM'],
  };
  return (
    <div className="min-h-screen"> {}
      <main>
        {}
        <MovieDetails
          trailerUrl={movieData.trailerUrl}
          titleOriginal={movieData.titleOriginal}
          classification={movieData.classification}
          genre={movieData.genre}
          director={movieData.director}
          actors={movieData.actors}
          country={movieData.country}
          duration={movieData.duration}
          distributor={movieData.distributor}
          showtimes={movieData.showtimes}
        />
      </main>
    </div>
  );
}