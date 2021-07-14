export default function (props) {
  const { totalPages, value, onChange } = props;
  return (
    <nav aria-label="Countries Pagination">
      <button
        onClick={() => {
          onChange(1);
        }}
      >
        {"1"}
      </button>
      <button
        onClick={() => {
          if(value > 1) onChange(value - 1);
        }}
      >
        {"<<"}
      </button>
      <button>{value}</button>
      <button
        onClick={() => {
          if(value < totalPages) onChange(value + 1);
        }}
      >
        {">>"}
      </button>
      <button
        onClick={() => {
          onChange(totalPages);
        }}
      >
        {totalPages}
      </button>
    </nav>
  );
}
