import { URL,UPDATE_PAGES,FILL_NEXT } from "./index";

export default function sentNewPokemon(newPokemon) {
  return function (dispatch) {
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => {
        dispatch({ type: FILL_NEXT, payload: [json.data] });
        dispatch({ type: UPDATE_PAGES });
        alert("sessecifi add", json.data.name);
      })
      .catch((error) => {
        alert("fallid add");
        console.error(error);
      });
  };
}
