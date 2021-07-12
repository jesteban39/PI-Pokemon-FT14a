import { Link } from "react-router-dom";
import { fillAll, fillTypes } from "../actions";
import { useDispatch } from "react-redux";

export default function LandingPage() {
  const dispatch = useDispatch();
  dispatch(fillTypes());
  dispatch(fillAll());
  return (
    <div className="landingPage">
      <Link to="/home">
        <button>Pokemons</button>
      </Link>
    </div>
  );
}
