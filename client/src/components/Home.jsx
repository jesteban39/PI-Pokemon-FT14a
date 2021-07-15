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
  PagesPokemons,
} from "./index";
import { fillTypes, fillAll } from "../actions";
import { Link } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [Sort, setSort] = useState("descent");
  const [SortBy, setSortBy] = useState("number");

  const dispatch = useDispatch();

  //if (typeNames.length <= 1) dispatch(fillTypes());

  function handleName(event) {
    const { value } = event.target;
    setName(value);
  }

  function handleSort(event) {
    const { value } = event.target;
    setSort(value);
  }
  function handleSortBy(event) {
    const { value } = event.target;
    setSortBy(value);
  }
  function handleSearch(event) {
    event.preventDefault();
    const { value } = event.target;
    setSort(value);
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        Search
        <label>Name:</label>
        <input onChange={handleName} value={name} />
        <input type="submit" value="Search" />
      </form>

      <Filter />

      <form>
        <label>Sort</label>

        <Select
          name="Sort: "
          options={["descent", "ascendant"]}
          onChange={handleSort}
        />

        <Select
          name="Sort by: "
          options={SORT_NAMES}
          onChange={handleSortBy}
        />
      </form>
      <Link to="/add">
        <label>Add pokemon</label>
      </Link>
      <PagesPokemons />
    </div>
  );
}
