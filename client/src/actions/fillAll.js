import {
  URL,
  UPDATE,
  UPDATE_PAGES,
  FILL_NEXT,
  FILL_ALL,
  RESET,
  ADD_PAGE,
} from "./index";

export default function fillAll(state) {
  return function (dispatch) {
    if (state.free === true) {
      dispatch({
        type: UPDATE,
        payload: { total: 0, free: false },
      });
      return fetch(`${URL}?from=0&limit=1`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error(`fetch 0 failed`);
        })
        .then((json) => {
          if (state.total < json.count) {
            dispatch({
              type: UPDATE,
              payload: { total: json.count, free: false },
            });
            let next = fetch(`${URL}?from=1&limit=1`);
            for (let i = 1; i <= json.count; i++) {
              next = next
                .then((response) => {
                  if (response.ok) return response.json();
                  else throw new Error(`fetch ${next} failed`);
                })
                .then((json) => {
                  dispatch({ type: FILL_NEXT, payload: json.data });
                  dispatch({ type: UPDATE_PAGES });
                  if (json.next) return fetch(json.next);
                  else
                    dispatch({
                      type: UPDATE,
                      payload: { total: json.count, free: true },
                    });
                });
            }
            return next;
          }
          return true;
        })
        .catch((error) => {
          dispatch({
            type: UPDATE,
            payload: { total: state.total, free: false },
          });
          console.error(error);
        });
    }
  };
}

export  function fillAll_(state) {
  return async function (dispatch) {
    console.log("state: ", state);
    if (state.free === true) {
      dispatch({
        type: UPDATE,
        payload: { total: state.total, free: false },
      });
      try {
        let page;
        let next = `${URL}?from=1`;
        do {
          page = await fetch(next).then((response) => {
            if (response.ok) return response.json();
            else throw new Error(`fetch ${next} failed`);
          });
          if (!page.count || state.total >= page.count) break;
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
          payload: { total: state.total, free: false },
        });
        //console.error(error);
      }
    }
  };
}
