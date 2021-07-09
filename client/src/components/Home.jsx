import { useState } from "react";
import { Link } from "react-router-dom";

import Select from "./Select";

const ORIGIN_NAMES = ["all", "favorite", "existing", "creations"];
const SORT_NAMES = ["number", "name", "force", "hp"];
const TYPE_NAMES = ["all", "rock", "normal", "undefine"];

let pokemons = [
  {
    id: 30003,
    name: "poke-pru",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    types: [
      { id: 9, name: "electric" },
      { id: 13, name: "rock" },
    ],
  },
];

export default function Home() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [Sort, setSort] = useState("descent");
  const [SortBy, setSortBy] = useState("number");

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

        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/:${pokemon.id}`}>
            <label>{pokemon.name}</label>
            <img src={pokemon.img} alt="img" />
            <div>
              {pokemon.types.map((type) => (
                <label key={type.id}>{`  ${type.name}  `}</label>
              ))}
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
