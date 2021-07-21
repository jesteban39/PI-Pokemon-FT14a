import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { POKEMON_PENDING } from "../reducers";
import { getDetails } from "../actions";
import { STAT_NAMES } from "./index";
import "./styles/detail.css";

export default function PokemonDetails(props) {
  const dispatch = useDispatch();
  dispatch(getDetails(props.match.params.id));
  let pokemon = useSelector((state) => state.pokemonDetails);
  if (!pokemon.name) pokemon = POKEMON_PENDING;
  return (
    <div className="container">
      <h1>{"Pokemon Detail"}</h1>
      <div className="pokemon">
        <img className="img" src={pokemon.img} alt="img" />
        <div className="details">
          <div className="info-details">
            <label>{` No. ${pokemon.id} `}</label>
            <label>{pokemon.name}</label>
            <label>{` Height: ${pokemon.height / 10} m`}</label>
            <label>{` Weight: ${pokemon.weight / 10} kg`}</label>
            <div className="container-types">
              <label className="types">{` Types: `}</label>
              <div></div>
            </div>
          </div>

          <div className="container-stats">
            <label>Stats:</label>
            <div className="stats">
              {STAT_NAMES.map((stat) => (
                <label
                  key={stat}
                >{` ${stat}: ${pokemon.stats[stat]} % `}</label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to="/home">
        <button className="button-home" type="button">
          Home
        </button>
      </Link>
    </div>
  );
}
