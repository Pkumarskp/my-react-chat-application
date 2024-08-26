import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKQlFGm8mXvUHnUUp0Rs4-MCxj792rXZA",
  authDomain: "chat-application-2e8c9.firebaseapp.com",
  databaseURL: "https://chat-application-2e8c9-default-rtdb.firebaseio.com",
  projectId: "chat-application-2e8c9",
  storageBucket: "chat-application-2e8c9.appspot.com",
  messagingSenderId: "423090474260",
  appId: "1:423090474260:web:1aa59b17f4cffd2d5b8601",
  measurementId: "G-10JY6YW3KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
