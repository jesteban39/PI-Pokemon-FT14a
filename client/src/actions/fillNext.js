import { URL, FILL_ALL, FILL_NEXT } from "./index";
let cont = 0;
export default function fillNext(next) {
  return function (dispatch) {
    if (next)
      return fetch(`${URL}?from=${++cont}&limit=1`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(`fetch ${next} failed`);
        })
        .then((json) => {
          dispatch({ type: FILL_NEXT, payload: json });
        })
        .catch((error) => {
          console.error(error);
        });
  };
}
