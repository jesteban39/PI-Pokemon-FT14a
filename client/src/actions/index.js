import sentNewPokemon from "./sentNewPokemon";
import getDetails from "./getDetails";
import udatePages from "./udatePages";
import fillTypes from "./fillTypes";
import fillNext from "./fillNext";
import fillAll from "./fillAll";

export const URL = "http://localhost:3001/pokemons";
export const SENT_NEW_POKEMON = "SENT_NEW_POKEMON";
export const UPDATE_PAGES = "UPDATE_PAGES";
export const GET_DETAILS = "GET_DETAILS";
export const FILL_TYPES = "FILL_TYPES";
export const FILL_NEXT = "FILL_NEXT";
export const FILL_ALL = "FILL_ALL";
export const UPDATE = "UPDATE";
export const RESET = "RESET";

export {
  udatePages,
  fillAll,
  fillNext,
  getDetails,
  fillTypes,
  sentNewPokemon,
};
