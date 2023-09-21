import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Authentication.module.css";

interface AuthenticationProps {
  onClick: () => void;
}

export default function Authentication({ onClick }: AuthenticationProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stylez = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  // function for sending login information
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const data = { email, password };
    try {
      // if user is logging in
      if (!data) {
        alert("one or more input cannot be empty");
      }
    } catch (error) {
      alert("An error Occured");
    }
    setEmail("");
    setPassword("");
  }
  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-block"]} style={stylez}>
        <div className={styles["form-block"]}>
          <h2> TMS</h2>
          <form onSubmit={submitHandler}>
            <h3>Welcome to HNG</h3>
            <p>"Log into your Account" </p>

            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <br />
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={onClick}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
