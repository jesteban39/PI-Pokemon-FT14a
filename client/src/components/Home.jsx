import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillTypes, getDetails, fillAll } from "../actions";
import { Link } from "react-router-dom";
import "./styles/home.css";
import {
  STAT_NAMES,
  DEFAUL_IMG,
  ORIGIN_NAMES,
  SORT_NAMES,
  PageNav,
  Filter,
  Select,
  Sort,
  PagesPokemons,
} from "./index";

export default function Home() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  //if (typeNames.length <= 1) dispatch(fillTypes());

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
