export default function Select(props) {
  const { name, options, title, onChange } = props;
  //word[0].toUpperCase() + word.slice(1);
  //
  return (
    <div>
      <label>{title}</label>
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
