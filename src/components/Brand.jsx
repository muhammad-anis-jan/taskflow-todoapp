import { Link } from "react-router-dom";
export default function Brand() {
  return (
    <Link to="/" className="brand">
      <i>t</i> task<span>flow</span>
    </Link>
  );
}
