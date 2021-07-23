import { useDispatch, useSelector } from "react-redux";
import "./styles/select.css";
import { STAT_NAMES, Select } from "./index";

export default function Sort() {
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
    <div className="container-selects">
      <label>{" Sort: "}</label>

      <Select
        cn="select"
        name="sequence"
        options={["ascendant", "descent"]}
        onChange={handleInput}
      />

      <Select
        cn="select"
        name="yardstick"
        options={["number", "name", "force"]}
        onChange={handleInput}
      />
    </div>
  );
}
