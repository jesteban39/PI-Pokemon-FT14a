
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_ID = "GET_POKEMON_ID";

const URL = "http://localhost:3001/"

export function getPokemons() {
  return function (dispatch) {
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_POKEMONS, payload: json });
      });
  };
}
export function getPokemonId(payload) {
  return {
    type: GET_POKEMON_ID,
    payload,
  };
}

/* 
export default {
    GET_POKEMONS,
    GET_MOVIE_DETAIL,
    ADD_MOVIE_FAVORITE,
    REMOVE_MOVIE_FOVORITE,
    getPOKEMONS,
    getMovieDetail,
    addMovieFavorite,
    removeMovieFavorite
}; */