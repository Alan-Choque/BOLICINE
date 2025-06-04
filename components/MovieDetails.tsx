"use client";
import React from 'react'
interface MovieDetailsProps {
  trailerUrl: string; // La URL para el trailer
  titleOriginal: string; // El título original 
  classification: string; // La clasificación 
  genre: string; // El género 
  director: string; // El director
  actors: string; // Los actores principales
  country: string; // El país de origen
  duration: string; // La duración 
  distributor: string; // El distribuidor
  showtimes: string[]; //los horarios 
}

const MovieDetails = ({
  trailerUrl,
  titleOriginal,
  classification,
  genre,
  director,
  actors,
  country,
  duration,
  distributor,
  showtimes 
}: MovieDetailsProps) => { 
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {trailerUrl && ( 
          <div style={styles.videoWrapper}>
            <iframe
              width="100%"
              height="350"
              src={trailerUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer de la película" 
            ></iframe>
          </div>
        )}
      </div>
      <div style={styles.detailsSection}>
        <h1 style={styles.movieTitle}>{titleOriginal || 'Título de la Película'}</h1>
        <p style={styles.movieDescription}>
          Acosado por una violenta pesadilla recurrente, el estudiante universitario Skye debe ir a casa con una localización. Es una persona que puede ver a los demás antes de su muerte y su destino es la espeluznante muerte que inevitablemente les espera a todos.
        </p>
        <div style={styles.infoGrid}>
          <div>
            <p style={styles.infoLabel}>TÍTULO ORIGINAL:</p>
            <p style={styles.infoValue}>{titleOriginal || 'N/A'}</p> {}
          </div>
          <div>
            <p style={styles.infoLabel}>CLASIFICACIÓN:</p>
            <p style={styles.infoValue}>{classification || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>GÉNERO:</p>
            <p style={styles.infoValue}>{genre || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>DIRECTOR:</p>
            <p style={styles.infoValue}>{director || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>ACTORES:</p>
            <p style={styles.infoValue}>{actors || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>PAÍS:</p>
            <p style={styles.infoValue}>{country || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>DURACIÓN:</p>
            <p style={styles.infoValue}>{duration || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.infoLabel}>DISTRIBUIDOR:</p>
            <p style={styles.infoValue}>{distributor || 'N/A'}</p>
          </div>
        </div>
        <div style={styles.showtimesSection}>
          <h3 style={styles.sectionTitle}>Funciones</h3>
          <div style={styles.showtimesButtons}>
            <button style={{...styles.timeButton, ...styles.activeButton}}>HOY</button>
            <button style={styles.timeButton}>Mañana</button>
            <button style={styles.timeButton}>Pasado Mañana</button>
          </div>
          <div style={styles.timesGrid}>
            {showtimes && showtimes.length > 0 ? (
              showtimes.map((time, index) => (
                <button key={index} style={styles.timeSlotButton}>
                  {time}
                </button>
              ))
            ) : (
              <p>No hay funciones disponibles.</p>
            )}
          </div>
          <button style={styles.continueButton}>CONTINUAR</button>
        </div>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '960px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '20px',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%', 
    height: 0,
    overflow: 'hidden',
    borderRadius: '8px',
  },
  videoWrapper_iframe: { 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  detailsSection: {
    padding: '0 20px',
  },
  movieTitle: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  movieDescription: {
    fontSize: '0.9em',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', 
    gap: '15px 30px', 
    marginBottom: '30px',
  },
  infoLabel: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    color: '#888',
    marginBottom: '5px',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '1em',
    color: '#333',
  },
  showtimesSection: {
    marginTop: '30px',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
  },
  sectionTitle: {
    fontSize: '1.5em',
    marginBottom: '15px',
    color: '#333',
  },
  showtimesButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  timeButton: {
    padding: '8px 15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    fontSize: '0.9em',
    color: '#555',
  },
  activeButton: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00bcd4',
    color: '#00bcd4',
  },
  timesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
    gap: '10px',
    marginBottom: '20px',
  },
  timeSlotButton: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '1em',
    color: '#333',
    transition: 'background-color 0.2s', 
  },
  continueButton: {
    backgroundColor: '#e50914', 
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1em',
    cursor: 'pointer',
    width: '100%', 
    marginTop: '20px',
  },
};
export default MovieDetails;