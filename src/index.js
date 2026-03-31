// 1) Bring React into scope so JSX can compile
import React from "react";

// 2) ReactDOM gives us the bridge from React → real DOM
import ReactDOM from "react-dom/client";

// 3) Our root component 
import App from "./components/App";

// 4) Global styles 
import "./styles/main.css";

// 5) Find the stage <div id="root"> in public/index.html
const container = document.getElementById("root");

// 6) Hand that stage to React and render <App /> into it
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)