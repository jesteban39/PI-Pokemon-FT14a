import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillTypes, fillAll } from "../actions";
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
    const { value } = event.target;
    setName(value);
  }

  function handleSearch(event) {
    event.preventDefault();
    const { value } = event.target;
    //dispatch(value);
  }

  return (
    <div className="home">
      <section className="home-menu">
        <form onSubmit={handleSearch}>
          <input
            placeholder="Pokemon Name"
            onChange={handleName}
            value={name}
          />
          <input type="submit" value="Search" />
        </form>

        <Link to="/add">
          <button>Add pokemon</button>
        </Link>

        <Filter />

        <Sort />
      </section>
      <PagesPokemons />
    </div>
  );
}
