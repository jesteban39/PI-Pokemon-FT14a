import { URL, FILL_ALL, RESET, ADD_PAGE } from "./index";

export default function fillAll() {
  return async function (dispatch) {
    let allPokemons = [];
    try {
      let exit = true;
      let i = 0;
      do {
        let pokemonsPage = await fetch(`${URL}?from=${12 * i + 1}`);
        pokemonsPage = await pokemonsPage.json();
        //.log(i, " data: ", pokemonsPage.previous);
        if (!pokemonsPage.next) exit = false;
        allPokemons = await [...allPokemons, ...pokemonsPage.data];
        i++;
      } while (exit);
      dispatch({ type: FILL_ALL, payload: allPokemons });
    } catch (error) {
      alert(error);
    }
  };
}

/*
export default function fillAll() {
  return function (dispatch) {
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: RESET });
        const numberPages = Math.floor(json.count / 12);
        let PromisePage = fetch(URL);
        for (let i = 1; i <= numberPages; i++) {
          PromisePage = PromisePage.then((res) => res.json())
            .then((json) => {
              dispatch({ type: ADD_PAGE, payload: json.data });
              console.log(" next: ", json.next);
              return fetch(json.next);
            })
            .catch((err) => console.error(err));
        }
      });
  };
}

export function fillAll_() {
  return async function (dispatch) {
    let allPokemons = [];
    try {
      let TOTAL = 2;
      let exit = true, i = 0;
      dispatch({ type: RESET})
      do{
        let pokemonsPage = await fetch(
          //URL + "?limit=3"
          `${URL}?from=${12 * i + 1}&limit=12`
        );
        pokemonsPage = await pokemonsPage.json();
        await console.log(i," data: ", pokemonsPage.previous);
        if(!pokemonsPage.next) exit = false;
        await dispatch({ type: ADD_PAGE, payload: pokemonsPage.data });        
        i++
      }while(exit)
      //dispatch({ type: FILL_ALL, payload: allPokemons });
    } catch (error) {
      alert(error);
    }
  };
}
*/
