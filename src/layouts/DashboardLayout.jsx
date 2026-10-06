import { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import Brand from "../components/Brand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dash">
      <DashboardSidebar
        open={open}
        close={() => setOpen(false)}
      />

      <div className="dash-main">
        <header className="dashbar">
          <button
            className="hamb dash-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>

          <Brand />

          <span>
            Search tasks / Anis Malik
          </span>
        </header>

        <main className="dash-content">
          {children}
        </main>
      </div>
    </div>
  );
}