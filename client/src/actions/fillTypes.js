import { URL, FILL_TYPES } from "./index";

export default function fillTypes() {
  return function (dispatch) {
    return fetch("http://localhost:3001/types")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type:FILL_TYPES, payload: json.data})
      });
  };
}
