import "./Login.css";
import { useContext, useEffect, useState } from "react";
import AppButton from "../../components/AppButton/AppButton";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastsContext } from "../../context/ToastsContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function Login() {

  const toast = useContext(ToastsContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const theme = useContext(ThemeContext)
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // will get return only if error
    if (auth) {
      const errMessage = await auth.signIn(email, password)
      if (!errMessage) {
        toast?.addToast("You logged in successfully!")
        navigate('/home')
      } else {
        setError(errMessage)
      }
    }
  }

  return (
    <div className={`Login Page ${theme?.isLightMode ? `light` : `dark`} `} >
      <form className="Login Page form" onSubmit={handleSubmit}>
        <input className="inputs" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder=" Enter your email" required />
        <input className="inputs" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder=" Enter your password" required />
        <div className="divBtn">
          <AppButton
            className="btn"
            type="submit"
            bootstarpButton="btn btn-success"
            context={"Log In"}
          /></div>
      </form>
      {error && <p className="errorP" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}