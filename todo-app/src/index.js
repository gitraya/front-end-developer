import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: true },
];

ReactDOM.render(
  <React.StrictMode>
    <App defaultTodos={DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
