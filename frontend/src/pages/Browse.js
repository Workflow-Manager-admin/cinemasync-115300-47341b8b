import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Browse.css";

// Demo data only; real backend integration for production
const DEMO_TITLES = [
  {
    id: "1",
    name: "Dune",
    year: 2021,
    image: "https://m.media-amazon.com/images/I/61SJsudku-L._AC_UY218_.jpg",
    type: "Movie",
  },
  {
    id: "2",
    name: "Stranger Things",
    year: 2022,
    image: "https://m.media-amazon.com/images/I/71N9C-lIf1L._AC_UY218_.jpg",
    type: "Series",
  },
  {
    id: "3",
    name: "Avatar: The Last Airbender",
    year: 2005,
    image: "https://m.media-amazon.com/images/I/81IIF+eD5RL._AC_UY218_.jpg",
    type: "Series",
  },
  {
    id: "4",
    name: "Everything Everywhere All at Once",
    year: 2022,
    image: "https://m.media-amazon.com/images/I/5176Tv7kZBL._AC_UY218_.jpg",
    type: "Movie",
  },
  {
    id: "5",
    name: "Interstellar",
    year: 2014,
    image: "https://m.media-amazon.com/images/I/71+MsdCQmVL._AC_SY879_.jpg",
    type: "Movie",
  },
  {
    id: "6",
    name: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    image: "https://m.media-amazon.com/images/I/81kSc2KDoMS._AC_SY879_.jpg",
    type: "Movie",
  },
  // Add more titles...
];

// PUBLIC_INTERFACE
function Browse() {
  const [search, setSearch] = useState("");

  const results = DEMO_TITLES.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      ("" + t.year).includes(search)
  );

  return (
    <div className="browse-root">
      <h2 className="browse-title">Browse Titles</h2>
      <input
        className="browse-search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search movies or series..."
        aria-label="Search"
      />
      <div className="browse-grid">
        {results.map((t) => (
          <div className="browse-card" key={t.id}>
            <img src={t.image} alt={t.name} className="browse-thumb" />
            <div className="browse-info">
              <div className="browse-name">{t.name}</div>
              <div className="browse-year-type">{t.year} &middot; {t.type}</div>
              <Link className="btn btn-mini" to={`/party/new?title=${encodeURIComponent(t.name)}`}>Watch in Party</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Browse;
