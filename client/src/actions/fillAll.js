import { UPDATE, UPDATE_PAGES, FILL_NEXT } from "./index";

export default function fillAll(state) {
  return function (dispatch) {
    const { free, total, next, pokemons } = state;
    if (free && next && (total === 0 || pokemons.length < total)) {
      dispatch({
        type: UPDATE,
        payload: { next, total, free: false },
      });
      return fetch(next)
        .then((response) => {
          if (response && response.ok) return response.json();
          else throw new Error(`failed ${next} fetch`);
        })
        .then((json) => {
          dispatch({ type: FILL_NEXT, payload: json.data });
          dispatch({
            type: UPDATE,
            payload: {
              next: json.next,
              total: json.count,
              free: true,
            },
          });
          dispatch({ type: UPDATE_PAGES });
        })
        .catch((error) => {
          dispatch({
            type: UPDATE,
            payload: { next, total, free: false },
          });
          console.error(error);
        });
    }
  };
}
