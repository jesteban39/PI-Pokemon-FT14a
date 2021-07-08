import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="landingPage">
      <Link to="/home">
        <button>Pokemons</button>
      </Link>
    </div>
  );
}