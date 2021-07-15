import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  STAT_NAMES,
  DEFAUL_IMG,
  ORIGIN_NAMES,
  SORT_NAMES,
  PageNav,
  Select,
  PagesPokemons,
} from "./index";

export default function () {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.sort);

  function handleInput(event) {
    const { name, value } = event.target;
    dispatch({
      type: "SORT",
      payload: { ...input, [name]: value },
    });
    dispatch({ type: "UPDATE_PAGES" });
  }
  return (
    <div>
      <label>Sort</label>

      <Select
        name="sequence"
        options={["ascendant", "descent"]}
        onChange={handleInput}
      />

      <Select
        name="yardstick"
        options={["number", "name",...STAT_NAMES]}
        onChange={handleInput}
      />
    </div>
  );
}
