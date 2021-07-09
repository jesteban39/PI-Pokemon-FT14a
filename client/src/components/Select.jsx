export default function Select(props) {
  const { name, options, onChange } = props;
  return (
    <div>
      <label>{name}</label>
      <select onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx}>{option}</option>
        ))}
      </select>
    </div>
  );
}
