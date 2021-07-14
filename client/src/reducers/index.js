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
export const POKEMON_PENDING = {
  id: 0,
  name: " --- ",
  height: 0,
  weight: 0,
  stats: {},
  img: "https://pa1.narvii.com/6598/705a28560eaa4f73e57f5585c9fcfae6d5e4264e_hq.gif",
  types: [" -- "],
};

export const PAGE_LIMIT = 12;

const initialState = {
  total: 0,
  free: true,
  currentPage: 1,
  filter: { type: "all", origin: "all" },
  pages: [[POKEMON_PENDING]],
  typeNames: [],
  pokemonDetails: POKEMON_PENDING,
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
        free: action.payload.free,
      };
    case "CURRETN_PAGE":
      return { ...state, currentPage: action.payload };
    case FILL_NEXT:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
        total: state.total + action.payload.length,
      };
    case FILL_ALL:
      return {
        ...state,
        total: action.payload.length,
        pokemons: action.payload,
      };
    case "FILTER":
      //console.log("filter state: ",action.payload)
      return { ...state, currentPage: 1, filter: action.payload };
    case UPDATE_PAGES:
      if (state.total > 0) {
        const { type, origin } = state.filter;
        let pages = [[]];
        let min = 0;
        let max = 3999;
        let countPges = 0;
        let count = 0;
        if (origin === "creations") min = 3000;
        else if (origin === "existing") max = 1000;

        for (let idx = 0; idx < state.total; idx++) {
          const pokemon = state.pokemons[idx];
          if ((count + 1) % PAGE_LIMIT === 0) {
            pages.push([]);
            countPges++;
          }
          if (
            pokemon.id > min &&
            pokemon.id < max &&
            (type === "all" || pokemon.types.includes(type))
          ) {
            pages[countPges].push(pokemon);
            count++;
          }
          //console.log("pokemon: ",state.pokemons[idx]);
          //console.log("idx: ",idx);
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
      return state || initialState;
  }
}
