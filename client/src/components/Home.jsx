import { useState } from "react";
import { useDispatch,  } from "react-redux";
import { getDetails,  } from "../actions";
import { Link } from "react-router-dom";
import "./styles/home.css";
import {
  Filter,
  Sort,
  PagesPokemons,
} from "./index";

export default function Home() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleName(event) {
    let { value } = event.target;
    value = value.toLowerCase().replace(/[^a-z\s]/g, "");
    setName(value);
  }

  function handleSearch(event) {
    dispatch(getDetails(name));
  }

  return (
    <div className="home">
      <section className="home-menu">
        <form >
          <input
            placeholder="Pokemon Name"
            onChange={handleName}
            value={name}
          />
          <Link onClick={handleSearch} to={`/pokemon/${name}`}>
            <input
              className="button-add-home"
              type="submit"
              value="Search"
            />
          </Link>
        </form>

        <Link to="/add">
          <button className="button-add-home">Add pokemon</button>
        </Link>

        <Filter />

        <Sort />
      </section>
      <PagesPokemons />
    </div>
  );
}
