import "./ListDetails.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";

export default function ListDetails({ favoriteLists, removeList }) {
  return (
    <>
      <section className="listDetails-section">
        {favoriteLists.map((list) => (
          <div key={list.id} className="listDetails-boxes">
            <div className="listDetails-movies-box">
              <h3 className="listDetails-fav-list-name">{list.name}</h3>

              {list.movies.map((movie) => (
                <div key={movie.imdbID} className="listDetails-movies">
                  <p className="listDetails-movie-title">{movie.Title}</p>

                  <a
                    className="imdb-trailer"
                    href={`https://www.imdb.com/title/${movie.imdbID}/`}
                    target="_blank"
                  >
                    IMDB
                  </a>
                </div>
              ))}
            </div>

            <button
              className="listDetails-movies-remove"
              onClick={() => removeList(list.id)}
            >
              x
            </button>
          </div>
        ))}
        <NavLink to="/" className="listDetails-movies-link">
          Movies
        </NavLink>
      </section>
    </>
  );
}
