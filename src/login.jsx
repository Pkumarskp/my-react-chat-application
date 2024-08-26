import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import necessary functions from Firebase

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(); // Initialize the Auth instance

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword with the auth instance
      console.log("Logged in successfully");
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
