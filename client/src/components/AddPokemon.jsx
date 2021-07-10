import { useState } from "react";
import { STAT_NAMES } from "./index";


export default function AddPokemon() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState({});

  const grades = ["rock", "normal", "undefine"];

  function handleName(event) {
    const name = event.target.value.replace(/[^a-z\s]/gi, "");
    setName(name);
  }
  function handleHeight(event) {
    const { value } = event.target;
    setHeight(value);
  }
  function handleWeight(event) {
    const { value } = event.target;
    setWeight(value);
  }
  function handleImage(event) {
    const { value } = event.target;
    setImage(value);
  }
  function handleTypes(event) {
    const { name, checked } = event.target;
    console.log("check: ", checked);
    if (checked) {
      setTypes((state) => [...state, name]);
    } else {
      setTypes((state) => state.filter((type) => type !== name));
    }
  }

  function handleStats(event) {
    const { name, value } = event.target;
    setStats((state) => {
      state[name] = value;
      return { ...state };
    });
  }

  return (
    <form>
      <h3>Add a new Pokemon</h3>
      <br />
      <label>
        Name :
        <input value={name} onChange={handleName} />
      </label>
      <br />
      <label>
        Height :
        <input type="number" value={height} onChange={handleHeight} />
      </label>
      <br />
      <label>
        Weight :
        <input type="number" value={weight} onChange={handleWeight} />
      </label>
      <br />
      <label>
        Image :
        <input type="url" value={image} onChange={handleImage} />
      </label>
      <br />
      <label>{types}</label>
      <br />
      {grades.map((type, idx) => (
        <label key={idx}>
          {type}
          <input name={type} type="checkbox" onChange={handleTypes} />
        </label>
      ))}
      <br />
      {STAT_NAMES.map((stat, idx) => (
        <label key={idx}>
          {stat}
          <input
            name={stat}
            type="number"
            value={stats[stat] || ""}
            onChange={handleStats}
          />
        </label>
      ))}
      <br />
      <input type="submit" value="Add" disabled={false} />
    </form>
  );
}
