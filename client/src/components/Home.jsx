import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  STAT_NAMES,
  DEFAUL_IMG,
  ORIGIN_NAMES,
  SORT_NAMES,
} from "../components";
import { fillAll, getDetails, fillTypes } from "../actions";
import { Link } from "react-router-dom";

import Select from "./Select";


export default function Home() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [Sort, setSort] = useState("descent");
  const [SortBy, setSortBy] = useState("number");

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const typeNames = useSelector((state) => state.typeNames);

  if (pokemons.length <= 1) dispatch(fillAll());
  if (typeNames.length <= 1) dispatch(fillTypes());

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
  function handle(event) {
    console.log(" targer: ", event.target.name);
    let id = event.target.name;
    dispatch(getDetails(id));
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

      <div>
        <span>40 pokemons</span>
        <Link to="/add">
          <span>Add pokemon</span>
        </Link>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <Link onClick={handle} to={`/pokemon/:${pokemon.id}`}>
              <img
                name={pokemon.id}
                width="120"
                height="150"
                src={pokemon.img}
                alt="img"
              />
            </Link>

            <div>
              <label name={pokemon.id}>{pokemon.name}</label>
              {pokemon.types.map((type) => (
                <label key={type}>{`  ${type}  `}</label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
