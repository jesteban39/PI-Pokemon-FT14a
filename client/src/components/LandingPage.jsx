import { Link } from "react-router-dom";
import { fillAll, fillTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function LandingPage() {
  const countTypes = useSelector((state) => state.typeNames.length);
  const total = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="landingPage">
      <Link to="/home">
        <button
        >
          Pokemons
        </button>
      </Link>
    </div>
  );
}
