import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // if (isAuthenticated) {
  //   navigate("/Link2");
  // }

  const viewLogin = (status: any) => {
    setError("");
    setIsLogin(status);
  };

  const handleSubmit = async (event: any, endpoint: any) => {
    event.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords dont match!");
      return;
    }
    try {
      const responce = await fetch(`http://localhost:3000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: username, password }),
      });

      const data = await responce.json();

      if (data.token) {
        login(data.token);
        navigate("/Link2");
      }
    } catch (err) {
      // setError(err.massage);
      console.error("Error", err);
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_box">
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="text"
            placeholder="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="type password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          )}
          <input
            type="submit"
            onClick={(event) =>
              handleSubmit(event, isLogin ? "login" : "signup")
            }
          />
          {error && <p>{error}</p>}
        </form>

        <div className="auth_buttons">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogin ? "#FFF" : "#BCBCBC" }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: !isLogin ? "#BCBCBC" : "#FFF" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
