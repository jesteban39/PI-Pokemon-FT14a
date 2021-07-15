import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  STAT_NAMES,
  DEFAUL_IMG,
  ORIGIN_NAMES,
  SORT_NAMES,
  PageNav,
  Filter,
  Select,
  Sort,
  PagesPokemons,
} from "./index";
import { fillTypes, fillAll } from "../actions";
import { Link } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  //if (typeNames.length <= 1) dispatch(fillTypes());

  function handleName(event) {
    const { value } = event.target;
    setName(value);
  }

  function handleSearch(event) {
    event.preventDefault();
    const { value } = event.target;
    //dispatch(value);
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        Search
        <label>Name:</label>
        <input
          placeholder="Search pokemon"
          onChange={handleName}
          value={name}
        />
        <input type="submit" value="Search" />
      </form>

      <Filter />

      <Sort />

      <Link to="/add">
        <button>Add pokemon</button>
      </Link>
      <PagesPokemons />
    </div>
  );
}
