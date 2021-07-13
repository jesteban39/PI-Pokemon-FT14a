import { URL, FILL_TYPES } from "./index";

export default function fillTypes(totalTypes) {
  return function (dispatch) {
    if (totalTypes === 0) {
      return fetch("http://localhost:3001/types")
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: FILL_TYPES, payload: json.data });
        });
    }
  };
}
