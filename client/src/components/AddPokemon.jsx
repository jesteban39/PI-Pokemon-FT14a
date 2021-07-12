import { useState } from "react";
import { Link } from "react-router-dom";
import { fillTypes, sentNewPokemon } from "../actions";
import { STAT_NAMES, DEFAUL_IMG } from "./index";
import { useDispatch, useSelector } from "react-redux";
import Select from "./Select";

export default function AddPokemon() {
  const dispatch = useDispatch();

  const grades = [
    "Select types",
    ...useSelector((state) => state.typeNames),
  ];

  if (grades.length <= 1) dispatch(fillTypes());

  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [img, setImg] = useState("");
  const [stats, setStats] = useState({});
  const [types, setTypes] = useState([]);
  const [finish, setFinish] = useState({}); //useState([false, true, false]);

  function handleName(event) {
    let { value } = event.target;
    value = value.trim().replace(/[^a-z\s]/gi, "");
    setName(value);
    setFinish((state) => {
      state["name"] = value.length > 2;
      return { ...state };
    });
  }
  function handleHeight(event) {
    const { value } = event.target;
    if (value >= 0 && value < 300) setHeight(value);
    setFinish((state) => {
      state["height"] = value > 0;
      return { ...state };
    });
  }
  function handleWeight(event) {
    const { value } = event.target;
    if (value >= 0 && value < 100) setWeight(value);
    setFinish((state) => {
      state["weight"] = value > 0;
      return { ...state };
    });
  }
  function handleImg(event) {
    const image = event.target.value;
    setImg(image);
    setFinish((state) => {
      const reEx = /^https?:\/\/[^\s'"]+\.(png|jpg)$/;
      state["image"] = !image || reEx.test(image);
      return { ...state };
    });
  }
  function handleTypes(event) {
    const { name, checked, value } = event.target;

    if (
      value !== "Select types" &&
      !name &&
      types.length < 6 &&
      !types.includes(value)
    ) {
      setFinish((state) => {
        state["type"] = true;
        return { ...state };
      });
      return setTypes((state) => [...state, value]);
    } else if (!checked && name && types.length > 1) {
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

  function handleSubmit(event) {
    console.log("res: ", "handle");
    event.preventDefault();
    let newPokemon = {
      name: name.toLowerCase().replace(/[\s]+/g, "-"),
      height: Math.floor(height / 10) || 1,
      weight: Math.floor(weight * 10) || 1,
      img: img || DEFAUL_IMG,
      lafe: stats.life || 1,
      force: stats.force,
      defense: stats.defense,
      speed: stats.speed,
      types,
    };

    dispatch(sentNewPokemon(newPokemon));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new Pokemon</h3>
      <div>
        <div>
          <label>Name :</label>
          <input value={name} onChange={handleName} />
        </div>
        <div>
          <label>Height: {height} cm</label>
          <input
            type="number"
            value={height}
            onChange={handleHeight}
          />
        </div>

        <div>
          <label>Weight: {weight} kg</label>
          <input
            type="number"
            value={weight}
            onChange={handleWeight}
          />
        </div>

        <label>Image :</label>
        <input type="url" value={img} onChange={handleImg} />
      </div>

      <div>
        <label>Types:{types}</label>
        <Select
          options={grades}
          name="Types"
          onChange={handleTypes}
        />
        {types.map((type) => (
          <div key={type}>
            <label>{type}</label>
            <input
              checked={true}
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
            <label>
              {stat}: {stats[stat]}
            </label>
            <input
              min="1"
              max="199"
              name={stat}
              type="range"
              value={stats[stat] || 1}
              onChange={handleStats}
            />
          </div>
        ))}
      </div>
      <input
        type="submit"
        value="Add"
        onSubmit={handleSubmit}
        disabled={
          Object.keys(finish).length < 5 ||
          Object.values(finish).includes(false)
        }
      />
      <Link to="/home">
        <button>Cancel</button>
      </Link>
    </form>
  );
}
