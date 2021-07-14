import { URL, FILL_TYPES, UPDATE } from "./index";

export default function fillTypes(state) {
  return function (dispatch) {
    const { free, typeNames } = state;
    if (free && typeNames.length === 0) {
      dispatch({
        type: UPDATE,
        payload: { free: false },
      });
      return fetch("http://localhost:3001/types")
        .then((res) => res.json())
        .then((json) => {
          dispatch({ type: FILL_TYPES, payload: json.data });
        }).finally(() => {
          dispatch({
            type: UPDATE,
            payload: { free: true },
          });
        });
    }
  };
}
