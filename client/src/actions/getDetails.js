import { URL, GET_DETAILS } from "./index";

export default function getDetails(id) {
  return function (dispatch) {
    return fetch(URL + `/${id}`)
      .then((response) => {
        //console.log("res: ", response);
        return response.json();
      })
      .then((json) => {
        //console.log("json: ",json);
        dispatch({ type: GET_DETAILS, payload: json.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
