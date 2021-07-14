import {
  URL,
  UPDATE,
  UPDATE_PAGES,
  FILL_NEXT,
  FILL_ALL,
  RESET,
  ADD_PAGE,
  fillTypes,
} from "./index";

function _fillAll(state) {
  return function (dispatch) {
    const { free, total, next, pokemons } = state;
    if (free && next && (total === 0 || pokemons.length < total)) {
      dispatch({
        type: UPDATE,
        payload: { free: false },
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
        .finally(() => {
          dispatch({
            type: UPDATE,
            payload: { free: true },
          });
        });
    }
  };
}

export default function fillAll(state) {
  return function (dispatch) {
    const { free, total, pokemons } = state;
    if (free === true && total === 0) {
      dispatch({
        type: UPDATE,
        payload: { total: 1, free: false },
      });
      return fetch(`${URL}?from=0&limit=1`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(`fetch 0 failed`);
        })
        .then((json) => {
          //if (total < json.count) {
          dispatch({
            type: UPDATE,
            payload: { total: json.count || total, free: false },
          });
          let next = fetch(`${URL}?from=1&limit=12`);
          for (let i = 1; i <= json.count / 12 + 1; i++) {
            next = next
              .then((response) => {
                if (response && response.ok) return response.json();
                else throw new Error(`fetch ${next} failed`);
              })
              .then((json) => {
                dispatch({ type: FILL_NEXT, payload: json.data });
                dispatch({ type: UPDATE_PAGES });
                if (json.next) return fetch(json.next);
                //else throw Error('finally')
              });
          }
          return next;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          dispatch({
            type: UPDATE,
            payload: { total, free: true },
          })
        );
    }
  };
}

function fillAll_(state) {
  return async function (dispatch) {
    const { free, total, count } = state;
    console.log("state: ", state);
    if (free === true) {
      dispatch({
        type: UPDATE,
        payload: { total: total, free: false },
      });
      try {
        let page;
        let next = `${URL}?from=1`;
        do {
          page = await fetch(next).then((response) => {
            if (response.ok) return response.json();
            else throw new Error(`fetch ${next} failed`);
          });
          if (!page.count || total >= page.count) break;
          console.log("state: ", state);
          console.log("url: ", next);
          dispatch({
            type: ADD_PAGE,
            payload: page.data,
          });
          next = page.next;
        } while (next);
        dispatch({
          type: UPDATE,
          payload: { total: page.count, free: true },
        });
        dispatch({ type: UPDATE_PAGES });
      } catch (error) {
        dispatch({
          type: UPDATE,
          payload: { total: total, free: false },
        });
        //console.error(error);
      }
    }
  };
}
