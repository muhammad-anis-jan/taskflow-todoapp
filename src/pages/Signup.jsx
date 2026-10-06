import { Link, useNavigate } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
export default function Signup() {

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate()  

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/dashboard");
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);

  const signup = async(e)=>{
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("UserCredits",userCredential.user);

      if(userCredential.user){
        console.log("Going to dashboard");
        
          navigate("/dashboard")
      }
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <AuthPanel
      title="Create your account"
      subtitle="A little more clarity is one step away."
      footer={
        <p className="auth-foot">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      }
    >
      <form className="form signup"  onSubmit={ signup } >
        <label>
          Your name
          <input placeholder="Enter Your Name" value={name} onChange={(e)=> setName(e.target.value)}/>
        </label>
        <label>
          Email address
          <input
            type="email"
            placeholder="Enter Your Email"
           value={email} onChange={(e)=> setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password} onChange={(e)=> setPassword(e.target.value)}
          />
        </label>
        <label className="terms">
          <input type="checkbox" /> I agree to the Terms of Service
        </label>
        <button className="button full" type="submit">Create account</button>
      </form>
    </AuthPanel>
  );
}
