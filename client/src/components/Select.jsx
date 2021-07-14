export default function Select(props) {
  const { name, options, onChange } = props;
  //word[0].toUpperCase() + word.slice(1);
  return (
    <div>
      <label>{name}</label>
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
