const Todo = ({
  name,
  id,
  completed,
  toggleCompletedTodo,
  filter,
  deleteTodo,
}) => {
  return (
    <div className="todo">
      <div className="todo-text">
        <input
          id={id}
          className="checkbox"
          type="checkbox"
          defaultChecked={completed}
          onChange={() => {
            toggleCompletedTodo(id);
          }}
        />
        <label className="label" htmlFor={id}>
          {name}
        </label>
      </div>
      {filter === "Completed" ? (
        <div className="delete-icon">
          <button type="button" onClick={() => deleteTodo(id)}>
            <i class="material-icons-round">delete_outline</i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Todo;
