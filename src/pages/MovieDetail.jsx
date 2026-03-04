import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MovieDetail.module.css";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(data.Title + " official trailer")}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
        )
          .then((res) => res.json())
          .then((ytData) => {
            if (ytData.items && ytData.items.length > 0) {
              setTrailerId(ytData.items[0].id.videoId);
            }
          });
      });
  }, [id]);

  if (!movie) return (
    <div style={{ backgroundColor: "#141414", minHeight: "100vh", padding: "40px" }}>
      <p style={{ color: "white" }}>Loading...</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.detail}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.Title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.Title}</h1>
          <p className={styles.meta}>
            📅 {movie.Year} &nbsp;|&nbsp; ⏱ {movie.Runtime} &nbsp;|&nbsp; 🎭 {movie.Genre}
          </p>
          <p className={styles.rating}>⭐ IMDB: {movie.imdbRating}</p>
          <p className={styles.plot}>{movie.Plot}</p>
          <p className={styles.cast}><strong>Director:</strong> {movie.Director}</p>
          <p className={styles.cast}><strong>Cast:</strong> {movie.Actors}</p>
        </div>
      </div>

      {trailerId && (
        <div className={styles.trailerSection}>
          <h2 className={styles.trailerTitle}>🎬 Official Trailer</h2>
          <div className={styles.trailerWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              title="Movie Trailer"
              allowFullScreen
              className={styles.trailer}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;