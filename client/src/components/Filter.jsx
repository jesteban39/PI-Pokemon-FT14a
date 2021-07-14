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
  const input = useSelector((state) => state.filter);
  const typeNames = [
    "all",
    ...useSelector((state) => state.typeNames),
  ];

  function handleInput(event) {
    const { name, value } = event.target;
    //console.log("even: ",name, value);
    //setInput((state) => ({...state, [name]: value}));
    dispatch({
      type: "FILTER",
      payload: { ...input, [name]: value },
    });
    dispatch({ type: "UPDATE_PAGES" });
  }
  return (
    <div>
      <label>Filter</label>
      <Select
        name="origin"
        options={ORIGIN_NAMES}
        onChange={handleInput}
      />
      <Select
        name="type"
        options={typeNames}
        onChange={handleInput}
      />
    </div>
  );
}
