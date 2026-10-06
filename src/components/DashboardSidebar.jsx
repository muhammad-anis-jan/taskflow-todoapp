import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
export default function DashboardSidebar({ open, close }) {
 const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
    await signOut(auth)
    navigate("/login")  
    } catch (error) {
      console.log("Error in logout button " , error);   
    }
    
    
  }
  return (
    <>
      <button
        className={"scrim " + (open ? "shown" : "")}
        onClick={close}
        aria-label="Close menu"
      />
      <aside className={"sidebar " + (open ? "side-open" : "")}>
        <div className="side-brand">
          <Brand />
          <button onClick={close} className="close" aria-label="Close menu">
            Close
          </button>
        </div>
        <small>WORKSPACE</small>
        <nav>
          <Link to="/dashboard">Overview</Link>
          <Link to="/dashboard">My tasks </Link>
          <Link to="/dashboard">Completed</Link>
          <Link to="/dashboard">Settings</Link>
        </nav>
        <div className="side-bottom">
          <div className="upgrade">
            <b>Make room for more</b>
            <p>Keep your best ideas close.</p>
          </div>
          <button onClick={handleLogout}>Log out</button>
          <p>
          Made by Muhammad Anis Jan <small>Free</small>
          </p>
        </div>
      </aside>
    </>
  );
}
