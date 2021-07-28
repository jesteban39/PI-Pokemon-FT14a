import { URL, UPDATE_PAGES, FILL_NEXT } from "./index";

let next = "URL";
let open = true;
let total = 0;
let count = 0;

export default function fillAll() {
  return function (dispatch) {
    if (next === "URL") next = URL + "pokemons";
    if (open && next && (total === 0 || count < total)) {
      open = false;
      return fetch(next)
        .then((response) => response.json())
        .then((json) => {
          if (!json.data) throw Error("data is not");
          total = json.count;
          next = json.next;
          count += json.data.length;
          dispatch({ type: FILL_NEXT, payload: json.data });
          dispatch({ type: UPDATE_PAGES });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          open = true;
          dispatch(fillAll());
        });
    }
  };
}
