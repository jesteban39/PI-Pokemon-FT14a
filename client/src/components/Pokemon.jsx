import { Link } from "react-router-dom";
export default function Pokemon() {
  let pokemon = {
    id: 30003,
    name: "poke-pru",
    height: 4,
    weight: 60,
    stats: {
      life: 35,
      force: 55,
      defense: 46,
      speed: 44,
    },
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    types: [
      { id: 9, name: "electric" },
      { id: 13, name: "rock" },
    ],
  };
  pokemon.stats = Object.entries(pokemon.stats);
  return (
    <div className="pokemon">
      <br />
      <span>{"pokemon detail"}</span>
      <br />
      <label>{` No.° ${pokemon.id} `}</label>
      <img src={pokemon.img} alt="img" />
      <label>{pokemon.name}</label>
      <label>{` Height: ${pokemon.height} `}</label>
      <label>{` Weight: ${pokemon.weight} `}</label>
      <div>
        <label>Types</label>
        <div>
          {pokemon.types.map((type) => (
            <label key={type.id}>{type.name}</label>
          ))}
        </div>
      </div>
      <div>
        <label>Stats</label>
        <div>
          {pokemon.stats.map((stat, idx) => (
            <label key={idx}>{` ${stat[0]}: ${stat[1]} `}</label>
          ))}
        </div>
      </div>
      <Link to="/home">
        <button type="button">Home</button>
      </Link>
    </div>
  );
}
