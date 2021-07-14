import PokemonDetails from "./PokemonDetails";
import LandingPage from "./LandingPage.jsx";
import PagesPokemons from "./PagesPokemons";
import AddPokemon from "./AddPokemon";
import PageNav from "./PageNav.jsx";
import Filter from "./Filter";
import Select from "./Select";
import Home from "./Home";

export const DEFAUL_IMG =
  "https://www.kindpng.com/picc/m/20-202226_yvr-pokeball-poke-ball-hd-png-download.png";
export const STAT_NAMES = ["life", "force", "defense", "speed"];
export const ORIGIN_NAMES = [
  "all",
  "existing",
  "creations",
];
export const SORT_NAMES = ["number", "name", "force", "life"];

export {
  PageNav,
  Select,
  LandingPage,
  Home,
  Filter,
  PokemonDetails,
  AddPokemon,
  PagesPokemons,
};
