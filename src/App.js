import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Main from "./components/Main";
import ListDetails from "./pages/ListDetails";

export default function App() {
  let [favoriteLists, setFavoriteLists] = useState([]);

  function createList(name, movies) {
    let newList = {
      id: Date.now(),
      name,
      movies,
    };

    setFavoriteLists((prev) => [...prev, newList]);
  }

  function removeList(id) {
    setFavoriteLists((prev) => prev.filter((list) => list.id != id));
  }

  return (
    <Routes>
      <Route path="/" element={<Main createList={createList} />} />
      <Route
        path="/listDetails"
        element={
          <ListDetails favoriteLists={favoriteLists} removeList={removeList} />
        }
      />
    </Routes>
  );
}
