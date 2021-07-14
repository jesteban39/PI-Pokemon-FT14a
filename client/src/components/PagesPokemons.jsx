import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PageNav } from "./index";
import { udatePages, getDetails } from "../actions";
import { Link } from "react-router-dom";

export default function Pagespages() {
  const dispatch = useDispatch();
  const { pages, currentPage } = useSelector((state) => state);

  function handleDetail(event) {
    let id = event.target.name;
    dispatch(getDetails(id));
  }

  function handlePage(value) {
    dispatch({ type: "CURRETN_PAGE", payload: value });
  }

  return (
    <div>
      <PageNav
        totalPages={pages.length}
        value={currentPage}
        onChange={handlePage}
      />

      <span placeholder="inicial">40 pages Pokemons</span>

      {pages[currentPage - 1].map((pokemon) => (
        <div key={pokemon.id}>
          <Link onClick={handleDetail} to={`/pokemon/:${pokemon.id}`}>
            <img
              name={pokemon.id}
              width="120"
              height="150"
              src={pokemon.img}
              alt="img"
            />
          </Link>

          <div>
            <label>{pokemon.name}</label>
            {pokemon.types.map((type) => (
              <label key={type}>{`  ${type}  `}</label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
