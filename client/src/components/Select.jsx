export default function Select(props) {
  const { name, options, title, onChange, cn } = props;
  return (
    <div className={cn}>
      <label>{title}</label>
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
