import "./App.css";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fillAll, fillTypes } from "./actions";
import {
  LandingPage,
  Home,
  PokemonDetails,
  AddPokemon,
} from "./components";
import "./App.css";

let state = null;
export function getState() {
  return state;
}

export default function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/pokemon/:id" exact>
        <PokemonDetails />
      </Route>
      <Route path="/add/" exact>
        <AddPokemon />
      </Route>
    </div>
  );
}
