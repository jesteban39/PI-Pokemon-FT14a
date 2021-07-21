import { FILL_TYPES } from "./index";
let open = true;
let total = 0;
export default function fillTypes() {
  return function (dispatch) {
    if (open && total === 0) {
      open = false;
      return fetch("http://localhost:3001/types")
        .then((res) => res.json())
        .then((json) => {
          if (!json.data) throw Error("data is not");
          total = json.count;
          dispatch({ type: FILL_TYPES, payload: json.data });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          open = true;
        });
    }
  };
}
