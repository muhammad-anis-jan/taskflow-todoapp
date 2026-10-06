import { Link } from "react-router-dom";
export default function Button({ to, children, secondary = false, ...p }) {
  return to ? (
    <Link className={"button " + (secondary ? "secondary" : "")} to={to}>
      {children}
    </Link>
  ) : (
    <button className="button" {...p}>
      {children}
    </button>
  );
}
