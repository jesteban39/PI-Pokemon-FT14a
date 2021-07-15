import { URL, FILL_TYPES, UPDATE } from "./index";
let cont = 0;
export default function fillTypes(state) {
  cont++
  return function (dispatch) {
    const { next, free, typeNames } = state;
    if (cont === 1 && free && typeNames.length === 0) {
      
      return fetch("http://localhost:3001/types")
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: FILL_TYPES, payload: json.data });
        })
        .catch((err) => {
          console.error(err);
        })
    }
  };
}
