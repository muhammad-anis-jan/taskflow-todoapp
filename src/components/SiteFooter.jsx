import { Link } from "react-router-dom";
import Brand from "./Brand";
export default function SiteFooter() {
  return (
    <footer className="footer container">
      <div>
        <Brand />
        <p>A calmer way to get things done.</p>
      </div>
      <div>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Log in</Link>
      </div>
      <small>Copyright 2026 TaskFlow</small>
    </footer>
  );
}
