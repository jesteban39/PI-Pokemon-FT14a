import {
  GET_POKEMONS
} from "../actions";

const initialState = {
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
    case GET_POKEMONS:
      return [...action.payload]
    default:
      return state;
  }
}
