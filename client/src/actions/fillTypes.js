import { URL, FILL_TYPES } from "./index";
let open = true;
let total = 0;
export default function fillTypes() {
  return function (dispatch) {
    if (open && total === 0) {
      open = false;
      console.log("dis");
      return fetch(URL + "types")
        .then((res) => res.json())
        .then((json) => {
          if (!json.data) throw Error("data is not");
          total = json.count;
          dispatch({ type: FILL_TYPES, payload: json.data });
        })
        .catch((err) => {
          console.error(err);
          dispatch({
            type: FILL_TYPES,
            payload: ["there are no types"],
          });
        })
        .finally(() => {
          open = true;
        });
    }
  };
}
