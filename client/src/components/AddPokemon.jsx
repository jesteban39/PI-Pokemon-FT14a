import { useState } from "react";
import { Link } from "react-router-dom";
import { fillTypes, sentNewPokemon } from "../actions";
import { STAT_NAMES, DEFAUL_IMG, Select } from "./index";
import { useDispatch, useSelector } from "react-redux";
import "./styles/add.css";
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
    value = value.toLowerCase().replace(/[^a-z\s]/g, "");
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
      value !== "on" &&
      types.length < 4 &&
      !types.includes(value)
    ) {
      setFinish((state) => {
        state["type"] = true;
        return { ...state };
      });
      return setTypes((state) => [...state, value]);
    } else if (!checked && types.length > 1) {
      setTypes((state) => state.filter((type) => type !== name));
    }
  }

  function handleStats(event) {
    let { name, value } = event.target;
    if (value >= 100) value = 99;
    setStats((state) => {
      state[name] = value;
      return { ...state };
    });
  }

  function handleSubmit(event) {
    console.log("res: ", "handle");
    event.preventDefault();
    let newPokemon = {
      name: name.trim().replace(/[\s]+/g, "-"),
      height: Math.floor(height / 10) || 1,
      weight: Math.floor(weight * 10) || 1,
      img: img || DEFAUL_IMG,
      lafe: stats.life || 1,
      force: stats.force,
      defense: stats.defense,
      speed: stats.speed,
      types,
    };
    if (
      window.confirm(
        `se creara el pokemon ${newPokemon.name}, desea continuar?`
      )
    ) {
      dispatch(sentNewPokemon(newPokemon));
    }
  }

  return (
    <div className="container-add">
      <form className="form-add" onSubmit={handleSubmit}>
        <h3>Add a new Pokemon</h3>
        <div className="container-inputs">
          <div className="add-inputs">
            <div className="container-input">
              <label>Name :</label>
              <input value={name} onChange={handleName} />
            </div>
            <div className="container-input">
              <label>Height:</label>
              <input
                className="inputs-num"
                type="number"
                value={height}
                onChange={handleHeight}
              />
              <label>cm</label>
            </div>

            <div className="container-input">
              <label>Weight:</label>
              <input
                className="inputs-num"
                type="number"
                value={weight}
                onChange={handleWeight}
              />
              <label>kg</label>
            </div>
            <div className="container-input">
              <label>Image :</label>
              <input type="url" value={img} onChange={handleImg} />
            </div>
          </div>

          <div className="add-inputs">
            <label>Types:</label>
            <Select
              options={grades}
              name="types"
              onChange={handleTypes}
            />
            <div>
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
          </div>
          <div className="add-inputs">
            {STAT_NAMES.map((stat) => (
              <div key={stat}>
                <label>{stat}:</label>
                <input
                  min="1"
                  max="199"
                  name={stat}
                  type="range"
                  value={stats[stat] || 1}
                  onChange={handleStats}
                />
                <label>{stats[stat]}%</label>
              </div>
            ))}
          </div>
        </div>
        <div className="buttons">
          <input
            className="button-add"
            type="submit"
            value="Add"
            onSubmit={handleSubmit}
            disabled={
              Object.keys(finish).length < 5 ||
              Object.values(finish).includes(false)
            }
          />
          <Link to="/home">
            <button className="button-add">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
