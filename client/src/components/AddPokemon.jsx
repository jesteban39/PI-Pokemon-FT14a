import { useState } from "react";
import { STAT_NAMES } from "./index";
import { useDispatch, useSelector } from "react-redux";

export default function AddPokemon() {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.typeNames);

  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [stats, setStats] = useState({});
  const [types, setTypes] = useState([]);

  const [finish, setFinish] = useState([true, true, true, false]);

  function handleName(event) {
    const name = event.target.value
      .toLowerCase()
      .replace(/[^a-z\s]/g, "");
    setName(name);
    handleFinish(name.length > 2, 0);
  }
  function handleHeight(event) {
    const { value } = event.target;
    setHeight(value);
    handleFinish(value > 0 && value < 200, 1);
  }
  function handleWeight(event) {
    const { value } = event.target;
    setWeight(value);
    handleFinish(value > 0 && value < 200, 2);
  }
  function handleImage(event) {
    const img = event.target.value;
    setImage(img);
    handleFinish(/^https?:\/\/[\S]+(\.png|\.jpg)$/g.test(img), 3);
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

  function handleFinish(condition, idx) {
    if (condition)
      setFinish((state) => {
        state[idx] = true;
        return state;
      });
    else
      setFinish((state) => {
        state[idx] = false;
        return state;
      });
  }

  return (
    <form>
      <h3>Add a new Pokemon</h3>
      <div>
        <label>Name :</label>
        <input value={name} onChange={handleName} />
        <label>Height :</label>
        <input
          type="integer"
          value={height}
          onChange={handleHeight}
        />
        <label>Weight :</label>
        <input
          type="integer"
          value={weight}
          onChange={handleWeight}
        />
        <label>Image :</label>
        <input type="url" value={image} onChange={handleImage} />
      </div>
      <input
        type="submit"
        value="Add"
        disabled={finish.includes(false)}
      />
      <div>
        <label>{types}</label>
        {grades.map((type) => (
          <div key={type}>
            <label>{type}</label>
            <input
              name={type}
              type="checkbox"
              onChange={handleTypes}
            />
          </div>
        ))}
      </div>
      <div>
        {STAT_NAMES.map((stat) => (
          <div key={stat}>
            <label>{stat}</label>
            <input
              name={stat}
              type="number"
              value={stats[stat] || ""}
              onChange={handleStats}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
