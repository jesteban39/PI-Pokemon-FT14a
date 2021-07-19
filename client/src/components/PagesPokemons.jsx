import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PageNav } from "./index";
import Pagination from "react-paginate";
import "./styles/pages.css";
import {
  udatePages,
  fillTypes,
  getDetails,
  fillAll,
} from "../actions";
import { Link } from "react-router-dom";

export default function Pagespages() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  dispatch(fillAll(state));
  dispatch(fillTypes(state));
  const { pages, currentPage } = useSelector((state) => state);

  function handleDetail(event) {
    let id = event.target.name;
    dispatch(getDetails(id));
  }

  function handlePage(event) {
    dispatch({ type: "CURRETN_PAGE", payload: event});
  }

  return (
    <div className="pages">
      <section className="container-pokemons">
        {pages[currentPage - 1].map((pokemon) => (
          <div className="pokemons" key={pokemon.id}>
            <Link
              onClick={handleDetail}
              to={`/pokemon/${pokemon.id}`}
            >
              <img
                className="pokemon-img"
                name={pokemon.id}
                src={pokemon.img}
                alt="img"
              />
            </Link>

            <div className="pokemon-info">
              <div className="name-id">
                <h4 className="name">{`${pokemon.name.replace("-"," ")}`}</h4>
                <h5 className="id">{`No. ${pokemon.id}`}</h5>
              </div>
              <div className="types">
                {pokemon.types.map((type) => (
                  <label
                    className="type"
                    key={type}
                  >{`  ${type}  `}</label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* <Pagination
      containerClassName="nav"
        pageCount={pages.length}
        onPageChange={}
        
      /> */}
      <PageNav
        totalPages={pages.length}
        value={currentPage}
        onChange={handlePage}
      />
    </div>
  );
}
