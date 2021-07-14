import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PageNav } from "./index";
import { udatePages, getDetails } from "../actions";
import { Link } from "react-router-dom";

export default function Pagespages(props) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages);

  const [currentPage, setPage] = useState(1);

  function handleDetail(event) {
    let id = event.target.name;
    dispatch(getDetails(id));
  }

  function handlePage(value) {
    setPage(value);
  }

  return (
    <div>
      <PageNav
        totalPages={page.length}
        value={currentPage}
        onChange={handlePage}
      />

      <span placeholder="inicial">40 pages Pokemons</span>

      {page[currentPage].map((pokemon) => (
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
