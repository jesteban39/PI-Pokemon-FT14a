import {
  UPDATE,
  UPDATE_PAGES,
  FILL_ALL,
  FILL_NEXT,
  ADD_PAGE,
  GET_DETAILS,
  FILL_TYPES,
  URL,
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

function compare({ yardstick, sequence }) {
  if (yardstick === "number") yardstick = "id";
  if (sequence === "ascendant") {
    return (pokemonA, pokemonB) => {
      if (pokemonA[yardstick] > pokemonB[yardstick]) return 1;
      if (pokemonA[yardstick] < pokemonB[yardstick]) return -1;
      return 0;
    };
  }
  if (sequence === "descent") {
    return (pokemonA, pokemonB) => {
      if (pokemonA[yardstick] > pokemonB[yardstick]) return -1;
      if (pokemonA[yardstick] < pokemonB[yardstick]) return 1;
      return 0;
    };
  }

  return (pokemonA, pokemonB) => {
    return 0;
  };
}

export const initialState = {
  pokemons: [],
  typeNames: [],
  pages: [[POKEMON_PENDING]],
  currentPage: 1,
  pokemonDetails: POKEMON_PENDING,
  filter: { type: "all", origin: "all" },
  sort: { yardstick: "number", sequence: "ascendant" },
  next: URL,
  free: true,
  total: 0,
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
        total: action.payload.total || state.total,
        next: action.payload.next,
        free: action.payload.free,
      };
    case "CURRETN_PAGE":
      return { ...state, currentPage: action.payload };
    case FILL_NEXT:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };
    case FILL_ALL:
      return {
        ...state,
        pokemons: action.payload,
      };
    case "SORT":
      return {
        ...state,
        sort: action.payload,
        pokemon: state.pokemons.sort(compare(action.payload)),
      };
    case "FILTER":
      //console.log("filter state: ",action.payload)
      return { ...state, currentPage: 1, filter: action.payload };

    case UPDATE_PAGES:
      if (state.pokemons.length > 0) {
        const { type, origin } = state.filter;
        //console.log("filter: ",type, origin)
        let pages = [[]];
        let name;
        let min = 0;
        let max = 3999;
        let countPges = 0;
        let count = 0;
        if (origin === "creations") min = 3000;
        else if (origin === "existing") max = 1000;
        //console.log("origin: ",min, max)
        for (let idx = 0; idx < state.pokemons.length; idx++) {
          const pokemon = state.pokemons[idx];
          if (count && count % PAGE_LIMIT === 0) {
            pages.push([]);
            countPges++;
          }
          if (
            pokemon.id > min &&
            pokemon.id < max &&
            (!type ||
              type === "all" ||
              pokemon.types.includes(type)) &&
            (!name || pokemon.name === name)
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
      if (!action.payload) return state;
      return { ...state, pokemonDetails: action.payload };
    case FILL_TYPES:
      return { ...state, typeNames: action.payload.sort() };
    default:
      return state || initialState;
  }
}
