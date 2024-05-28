import { useState } from "react";

// Login form
const Auth = () => {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleSubmit = async (event, endpoint) => {
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
        localStorage.setItem('token', data.token);
        console.log('Token stored: ', data.token);
      }
    } catch (err) {
      setError(err.massage);
      console.error("Error", err);
    }
  };


  return (
    <div>
      <form>
        <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
        <input
          type="text"
          placeholder="username"
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
          onClick={(event) => handleSubmit(event, isLogin ? "login" : "signup")}
        />
        {error && <p>{error}</p>}
      </form>
      <div>
        <button onClick={() => viewLogin(false)}>Sign Up</button>
        <button onClick={() => viewLogin(true)}>Login</button>
      </div>
    </div>
  );
};

export default Auth;
