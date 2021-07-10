import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import  {fillAll}  from "../actions";
import { Link } from "react-router-dom";

import Select from "./Select";

const ORIGIN_NAMES = ["all", "favorite", "existing", "creations"];
const SORT_NAMES = ["number", "name", "force", "life"];
const TYPE_NAMES = ["all", "rock", "normal", "undefine"];

export default function Home() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [Sort, setSort] = useState("descent");
  const [SortBy, setSortBy] = useState("number");

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

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
  //console.log("data: ", pokemons);

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
          options={TYPE_NAMES}
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
        <br />

        {pokemons.map((pokemon,idx) => (
          <Link key={pokemon.id} to={`/pokemon/:${pokemon.id}`}>
            <label>{pokemon.name}</label>
            <img width="120" height="160" src={pokemon.img} alt="img" />
            <div>
              {pokemon.types.map((type) => (
                <label key={type}>{`  ${type}  `}</label>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
