import { FILL_ALL, RESET, ADD_PAGE, GET_DETAILS } from "../actions";

const initialState = {
  pokemonDetails: {
    id: 0,
    name: "",
    height: 0,
    weight: 0,
    stats: {},
    img: "",
    types: [],
  },
  pokemons: [
    {
      id: 0,
      name: "",
      img: "",
      types: [],
    },
  ],
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
    default:
      return state;
  }
}
