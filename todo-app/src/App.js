import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const App = ({ defaultTodos }) => {
  // Todos and filter todo state
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  // Add new todo
  const addTodo = (name) => {
    const newTodo = { id: `todo-${nanoid()}`, name, completed: false };
    localStorage.setItem("dataTodos", JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
  };

  // Delete todo
  const deleteTodo = (id) => {
    const remainingTodo = todos.filter((todo) => id !== todo.id);
    localStorage.setItem("dataTodos", JSON.stringify(remainingTodo));
    setTodos(remainingTodo);
  };

  // Delete completed todos
  const deleteCompletedTodos = () => {
    const remainingTodo = todos.filter((todo) => false === todo.completed);
    localStorage.setItem("dataTodos", JSON.stringify(remainingTodo));
    setTodos(remainingTodo);
  };

  // Toggle completed todo
  const toggleCompletedTodo = (id) => {
    const updateTodos = todos.map((todo) =>
      id === todo.id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("dataTodos", JSON.stringify(updateTodos));
    setTodos(updateTodos);
  };

  // Displaying todo
  const todoList = todos.filter(FILTER_MAP[filter]).map((todo) => {
    return (
      <Todo
        name={todo.name}
        id={todo.id}
        key={todo.id}
        completed={todo.completed}
        toggleCompletedTodo={toggleCompletedTodo}
        filter={filter}
        deleteTodo={deleteTodo}
      />
    );
  });

  // Filtering todo
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Show delete all button
  const showDeleteAll = () => {
    const todoCompleted = todos.filter((todo) => todo.completed === true);

    if (todoCompleted.length > 1 && filter === "Completed")
      return (
        <div className="del-all-container">
          <button type="submit" onClick={deleteCompletedTodos}>
            <i class="material-icons-round">delete_outline</i> delete all
          </button>
        </div>
      );
  };

  // Save todos in local storage
  const takeDataLocalTodos = () => {
    const data = JSON.parse(localStorage.getItem("dataTodos"));
    setTodos(data || defaultTodos);
  };

  useEffect(() => {
    takeDataLocalTodos();
  }, []);

  return (
    <div className="App">
      <header className="col-6">
        <h1>#todo</h1>
      </header>
      <main>
        <div className="container">
          <div className="filter-container">{filterList}</div>
          <div
            className="form-container"
            style={filter === "Completed" ? { margin: "0px" } : {}}
          >
            {filter !== "Completed" && <Form addTodo={addTodo} />}
          </div>
          <div className="todos-container">{todos ? todoList : ""}</div>
          {showDeleteAll()}
        </div>
      </main>
      <footer>
        <small className="copyright">
          created by
          <b>
            <a
              href="https://github.com/gitraya"
              target="_blank"
              rel="noreferrer"
            >
              gitraya
            </a>
          </b>
          - devChallenges.io
        </small>
      </footer>
    </div>
  );
};

export default App;
