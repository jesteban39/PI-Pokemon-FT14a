import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  STAT_NAMES,
  DEFAUL_IMG,
  ORIGIN_NAMES,
  SORT_NAMES,
  PageNav,
  PagesPokemons
} from "./index";
import { fillTypes } from "../actions";
import { Link } from "react-router-dom";

import Select from "./Select";

export default function Home() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [Sort, setSort] = useState("descent");
  const [SortBy, setSortBy] = useState("number");

  const dispatch = useDispatch();
  const typeNames = ["all", ...useSelector((state) => state.typeNames)]

  //if (typeNames.length <= 1) dispatch(fillTypes());


  function handleName(event) {
    const { value } = event.target;
    setName(value);
  }
  function handleOrigin(event) {
    const { value } = event.target;
    setOrigin(value);
  }
  function handleType(event) {
    const { value } = event.target;
    setType(value);
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

      <form>
        <label>Filter</label>
        <Select
          name="Origin: "
          options={ORIGIN_NAMES}
          onChange={handleOrigin}
        />
        <Select
          name="Type: "
          options={typeNames}
          onChange={handleType}
        />
      </form>

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
        <span>Add pokemon</span>
      </Link>
      <PagesPokemons origin={origin} type={type}/>
    </div>
  );
}
