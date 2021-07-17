import "./styles/nav.css";

export default function (props) {
  const { totalPages, value, onChange } = props;
  return (
    <nav className="nav">
      <button
        className="item-nav"
        onClick={() => {
          onChange(1);
        }}
      >
        {"1"}
      </button>
      <button
        className="item-nav"
        onClick={() => {
          if (value > 1) onChange(value - 1);
        }}
      >
        {"<<"}
      </button>
      <button className="item-nav">{value}</button>
      <button
        className="item-nav"
        onClick={() => {
          if (value < totalPages) onChange(value + 1);
        }}
      >
        {">>"}
      </button>
      <button
        className="item-nav"
        onClick={() => {
          onChange(totalPages);
        }}
      >
        {totalPages}
      </button>
    </nav>
  );
}
