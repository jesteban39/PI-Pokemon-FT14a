import { URL, GET_DETAILS } from "./index";

let open = true;

export default function getDetails(id) {
  return function (dispatch) {
    if (open) {
      open = false;
      return fetch(URL + `pokemons/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if(!json.data) throw Error("no machets")
          dispatch({ type: GET_DETAILS, payload: json.data });
        })
        .catch((error) => {
          dispatch({ type: GET_DETAILS, payload: {}});
          console.error(error);
        }).finally(() => {
          open = true;
        })
    }
  };
}
