import { Link } from "react-router-dom";
import { STAT_NAMES } from "./index";
export default function Pokemon() {
  let pokemon = {
    id: 3003,
    name: "poke-detail",
    height: 4,
    weight: 60,
    stats: {
      life: 35,
      force: 55,
      defense: 46,
      speed: 44,
    },
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    types: ["electric", "rock"],
  };
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
            <label key={type}>{type}</label>
          ))}
        </div>
      </div>
      <div>
        <label>Stats</label>
        <div>
          {STAT_NAMES.map((stat) => (
            <label
              key={stat}
            >{` ${stat}: ${pokemon.stats[stat]} `}</label>
          ))}
        </div>
      </div>
      <Link to="/home">
        <button type="button">Home</button>
      </Link>
    </div>
  );
}
