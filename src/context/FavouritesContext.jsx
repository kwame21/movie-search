import { createContext, useState, useContext } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (movie) => {
    setFavourites((prev) => [...prev, movie]);
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((m) => m.imdbID !== id));
  };

  const isFavourite = (id) => {
    return favourites.some((m) => m.imdbID === id);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}