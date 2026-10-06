import { Link, useNavigate } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthPanel
      title="Welcome back"
      subtitle="Pick up where you left off."
      footer={
        <p className="auth-foot">
          New to TaskFlow? <Link to="/signup">Create an account</Link>
        </p>
      }
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Email address
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </label>

        <div className="option">
          <label>
            <input type="checkbox" /> Remember me
          </label>

          <button type="button">Forgot password?</button>
        </div>

        <button className="button full" type="submit">
          Log in
        </button>
      </form>
    </AuthPanel>
  );
}