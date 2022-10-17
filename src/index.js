import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0WhEC6fzUyRNvteAiiKqRuvBJXvVEKeM",
  authDomain: "blue-52773.firebaseapp.com",
  databaseURL: "https://blue-52773-default-rtdb.firebaseio.com",
  projectId: "blue-52773",
  storageBucket: "blue-52773.appspot.com",
  messagingSenderId: "786358931643",
  appId: "1:786358931643:web:7637f72ba40fb5e9aa199e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
