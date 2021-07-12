import { URL, SENT_NEW_POKEMON } from "./index";

export default function sentNewPokemon(newPokemon) {
  return function (dispatch) {
    console.log("res: ", "dispatch");
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((json) => {
        console.log("res: ", json);
        alert("sessecifi add", json.data.name);
      })
      .catch((error) => {
        console.log("res: ", "error");
        console.error(error);
      });
  };
}

// Petición HTTP
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(/* jsonData */),
};
