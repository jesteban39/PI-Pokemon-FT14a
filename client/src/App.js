import { Route, BrowserRouter } from "react-router-dom";
import { fillTypes, fillAll } from "./actions";
import { useDispatch } from "react-redux";

import {
  LandingPage,
  Home,
  PokemonDetails,
  AddPokemon,
} from "./components";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  dispatch(fillAll());
  dispatch(fillTypes());
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/pokemon/:id" exact component={PokemonDetails} />
        <Route path="/add/" exact>
          <AddPokemon />
        </Route>
      </div>
    </BrowserRouter>
  );
}
