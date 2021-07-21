import { useDispatch, useSelector } from "react-redux";
import "./styles/select.css";
import { ORIGIN_NAMES, Select } from "./index";

export default function Filter() {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.filter);
  const typeNames = [
    "all",
    ...useSelector((state) => state.typeNames),
  ];

  function handleInput(event) {
    const { name, value } = event.target;
    dispatch({
      type: "FILTER",
      payload: { ...input, [name]: value },
    });
    dispatch({ type: "UPDATE_PAGES" });
  }
  return (
    <div className="container-selects">
      <label>{"Filter:"}</label>

      <Select
        cn="select"
        name="origin"
        options={ORIGIN_NAMES}
        onChange={handleInput}
      />
      <Select
        cn="select"
        name="type"
        options={typeNames}
        onChange={handleInput}
      />
    </div>
  );
}
