import {
  UPDATE,
  UPDATE_PAGES,
  FILL_ALL,
  FILL_NEXT,
  RESET,
  ADD_PAGE,
  GET_DETAILS,
  FILL_TYPES,
  URL,
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

export const POKEMONS_FOR_PAGE = 12;

const initialState = {
  total: 0,
  free: true,
  pages: [[POKEMON_DEFAULT]],
  typeNames: [],
  pokemonDetails: POKEMON_DEFAULT,
  pokemons: [],
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        total: action.payload.total,
        free: action.payload.free,
      };
    case FILL_NEXT:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case FILL_ALL:
      return { ...state, pokemons: action.payload };
    case UPDATE_PAGES:
      if (state.pokemons.length > 0) {
        let pages = [[]];
        let countPges = 0;
        for (let idx = 0; idx < state.pokemons.length; idx++) {
          if ((idx + 1) % POKEMONS_FOR_PAGE === 0) {
            countPges++;
            pages.push([]);
          }
          //console.log("pokemon: ",state.pokemons[idx]);
          //console.log("idx: ",idx);
          pages[countPges].push(state.pokemons[idx]);
          //console.log("state pages: ", pages);
        }
        return { ...state, pages };
      } else return state;
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
