export default function Select(props) {
  const { name, options, onChange } = props;
  return (
    <div>
      <label>{name}</label>
      <select value="Select types" onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
