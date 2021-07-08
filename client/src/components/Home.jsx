import { Link } from "react-router-dom";
export default function Home() {
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
  function onChange(event) {}
  function onClick(event) {}
  return (
    <div className="home">
      <div>
        <label>Name:</label>
        <input className="" onChange={onChange} value={"name"} />
        <button onClick={onClick} className="">
          Search
        </button>
      </div>
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
