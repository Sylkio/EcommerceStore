import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import registerUser
import styles from "./Auth.module.css";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error: apiError } = await registerUser({
        username,
        password,
      });

      if (apiError) {
        setError(apiError);
      } else if (data && data.token) {
        localStorage.setItem("token", data.token); // Store token
        navigate("/"); // Redirect to homepage
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
