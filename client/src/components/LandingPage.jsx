import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fillAll,fillTypes } from "../actions";

export default function LandingPage() {
  const dispatch = useDispatch();
  dispatch(fillAll());
  dispatch(fillTypes());
  return (
    <div className="landingPage">
      <Link to="/home">
        <button>Pokemons</button>
      </Link>
    </div>
  );
}
