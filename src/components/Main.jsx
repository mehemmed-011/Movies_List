import "./Main.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";

export default function Main({ createList }) {
  let [films, setFilms] = useState([]);
  let [inpText, setInpTExt] = useState("");
  let [favorites, setFavorites] = useState([]);
  let [listName, setListName] = useState("");

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=movie&apikey=948498ab")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.Search);
      });
  }, []);

  function change(e) {
    setInpTExt(e.target.value.trim());
  }

  function click() {
    let s = inpText;
    // console.log(s);

    fetch(`https://www.omdbapi.com/?s=${s}&apikey=948498ab`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFilms(data.Search || []);
        // console.log(films);
      });
  }

  function addFavorite(movie) {
    setFavorites([...favorites, movie]);
  }

  function removeFavorite(imdbID) {
    setFavorites(favorites.filter((item) => item.imdbID != imdbID));
  }
  return (
    <>
      <header className="header">MOVIE</header>

      <section className="first-section">
        <input
          onChange={change}
          className="search-text"
          type="text"
          placeholder="Search"
        />
        <button onClick={click} className="search-btn">
          Search
        </button>
      </section>

      <section className="second-section">
        <div className="movie-box">
          {films.map((item) => {
            let isFavorite = favorites.some((fav) => fav.imdbID == item.imdbID);

            return (
              <div key={item.imdbID} className="movies">
                <img className="poster" src={item.Poster} alt="poster" />

                <div className="text-box">
                  <h2 className="title">{item.Title}</h2>
                  <p className="year">Year: {item.Year}</p>

                  <button
                    className={isFavorite ? "fav-btn-deactive" : "fav-btn"}
                    onClick={() => !isFavorite && addFavorite(item)}
                  >
                    + Favorite
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="listes-box">
          <div className="favorite-box">
            {favorites.map((item) => (
              <div key={item.imdbID} className="fav-movie-box">
                <p className="fav-movie-name">{item.Title}</p>

                <button
                  className="fav-movie-remove"
                  onClick={() => removeFavorite(item.imdbID)}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          <input
            className="fav-list-text"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button
            className={listName.trim() ? "fav-add-btn-active" : "fav-add-btn"}
            onClick={() => {
              if (!listName.trim()) return;

              createList(listName, favorites);
              setListName("");
              setFavorites([]);
            }}
          >
            Add To Favorite List
          </button>
          <NavLink to="/listDetails" className="fav-list-look">
            Look At Favorite List
          </NavLink>
        </div>
      </section>
    </>
  );
}
