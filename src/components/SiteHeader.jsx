import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import Button from "./Button";
import { auth } from "../lib/firebase";
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const navigate = useNavigate()
  const handler = () =>{
    if(auth.currentUser){
      navigate("/dashboard")
    }else{
      navigate("/signup")
    }
  }
  return (
    <header className="header">
      <div className="container nav">
        <Brand />
        <button
          className="hamb"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
        <nav className={open ? "open" : ""}>
          <NavLink end to="/" onClick={close}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={close}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={close}>
            Contact
          </NavLink>
          <Link to="/login">Log in</Link>
          <Button onClick={handler}>Get started</Button>
        </nav>
      </div>
    </header>
  );
}
