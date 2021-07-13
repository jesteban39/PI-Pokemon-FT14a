import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {udatePages, getDetails } from "../actions";
import { Link } from "react-router-dom";

var con = 0;

export default function Pagespages(props) {
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage] = useState(1);
  const page = useSelector((state) => state.pages[0]);
  //console.log("page: ",page)

 // dispatch(udatePages());
/* 
  function filtered() {
    if (origin === "creations" && types !== "all")
      return pages.filter((pokemon) => {
        return pokemon.id > 3000;
      });
    if (origin === "existing" && types !== "all")
      return pages.filter((pokemon) => {
        return pokemon.id < 3000;
      });
    return pages;
  } */


  function handleDetail(event) {
    let id = event.target.name;
    dispatch(getDetails(id));
  }

  return (
    <div>
      <span>40 pages Pokemons</span>

      {page.map((pokemon) => (
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
