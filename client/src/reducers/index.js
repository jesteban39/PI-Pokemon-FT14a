import {
  FILL_ALL,
  RESET,
  ADD_PAGE,
  GET_DETAILS,
  FILL_TYPES,
  SENT_NEW_POKEMON,
} from "../actions";
export const POKEMON_DEFAULT = {
  id: 0,
  name: " --- ",
  height: 0,
  weight: 0,
  stats: {},
  img: "https://pa1.narvii.com/6598/705a28560eaa4f73e57f5585c9fcfae6d5e4264e_hq.gif",
  types: [" -- "],
};
const initialState = {
  typeNames: [],
  pokemonDetails: POKEMON_DEFAULT,
  pokemons: [POKEMON_DEFAULT],
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_ALL:
      return { ...state, pokemons: action.payload };
    case RESET:
      return { ...state, pokemons: [] };
    case ADD_PAGE:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case GET_DETAILS:
      return { ...state, pokemonDetails: action.payload };
    case FILL_TYPES:
      return { ...state, typeNames: action.payload.sort() };
    default:
      return state;
  }
}
