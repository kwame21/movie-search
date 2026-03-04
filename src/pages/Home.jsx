import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import styles from "../App.module.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  // Read search from URL instead of local state
  const search = searchParams.get("search") || "";

  useEffect(() => {
    if (search.length < 3) return;

    fetch(`https://www.omdbapi.com/?s=${search}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
      });
  }, [search]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Movie Search App</h1>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={handleSearch}
        className={styles.input}
      />

      <div className={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID + movie.Title}
            className={styles.card}
          >
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
                onClick={() =>
                  isFavourite(movie.imdbID)
                    ? removeFavourite(movie.imdbID)
                    : addFavourite(movie)
                }
              >
                {isFavourite(movie.imdbID) ? "❤️ Saved" : "🤍 Favourite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;