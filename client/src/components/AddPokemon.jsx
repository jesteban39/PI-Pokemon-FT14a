import { useState } from "react";

export default function AddPokemon() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [image, setImage] = useState();

  function handleName(event) {
    let name = event.target.value
      .toLowerCase()
      .replace(/[^a-z\s]/gi, "");
    setName(name);
  }
  function handleHeight(event) {
    let height = event.target.value;
    setHeight(height < 0 || height);
  }
  function handleWeight(event) {
    let weight = event.target.value;
    setWeight(weight < 0 || weight);
  }
  function handleImage(event) {
    setImage(event.target.value);
  }
  return (
    <form>
      <h3>Add a new Pokemon</h3>
      <br />
      <label>Name:</label>
      <input autocomplete="name" value={name} onChange={handleName} />
      <br />
      <label>Height:</label>
      <input type="number" value={height} onChange={handleHeight} />
      <br />
      <label>Weight:</label>
      <input type="number" value={weight} onChange={handleWeight} />
      <br />
      <label>Image URL :</label>
      <input type="url" value={image} onChange={handleImage} />
      <br />
      <input type="submit" value="Add" disabled={false} />
      <br />
      {/*() =>
        items.map((label) => (
          <label>
            <input
              type="checkbox"
              checked={label}
              onChange={this.toggleCheckbox}
            />
            {label}
            { 
                  <Checkbox
                    label={label}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={label}
                  /> }
          </label>
        ))*/}
    </form>
  );
}
