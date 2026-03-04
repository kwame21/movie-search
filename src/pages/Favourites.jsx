import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import styles from "../App.module.css";

function Favourites() {
  const { favourites, removeFavourite } = useFavourites();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>❤️ My Favourites</h1>

      {favourites.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center" }}>
          No favourites yet! Go search for movies 🎬
        </p>
      ) : (
        <div className={styles.grid}>
          {favourites.map((movie) => (
            <div key={movie.imdbID} className={styles.card}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
                alt={movie.Title}
                className={styles.poster}
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.movieTitle}>{movie.Title}</h3>
                <p className={styles.year}>📅 {movie.Year}</p>
                <button
                  className={styles.favBtn}
                  onClick={() => removeFavourite(movie.imdbID)}
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;