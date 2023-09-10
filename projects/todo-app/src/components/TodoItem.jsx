import { FaRegCircle, FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa";

function TodoItem({ todo, onCompleteTodo, onDeleteTodo }) {
  function handleComplete() {
    onCompleteTodo(todo.id);
  }

  function handleDelete() {
    onDeleteTodo(todo.id);
  }

  return (
    <li className="todo-item">
      <p>{todo.description}</p>
      <div className="actions-section">
        <span onClick={handleComplete}>
          {todo.completed ? <FaRegCheckCircle /> : <FaRegCircle />}
        </span>
        <span onClick={handleDelete}>
          <FaRegTrashAlt />
        </span>
      </div>
    </li>
  );
}

export { TodoItem };
