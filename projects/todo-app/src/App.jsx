import { useEffect, useState } from "react";
import "./App.css";
import { TodoCreator } from "./components/TodoCreator";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { TodoSection } from "./components/TodoSection";

function App() {
  const [todos, setTodos] = useState(() => {
    let todosFromLocalStorage = JSON.parse(localStorage.getItem("todos-app"));
    return todosFromLocalStorage ? todosFromLocalStorage : [];
  });
  const [section, setSection] = useState("All");

  useEffect(() => {
    let todosString = JSON.stringify(todos);
    localStorage.setItem("todos-app", todosString);
  }, [todos]);

  let filteredTodos;
  if (section === "All") {
    filteredTodos = todos;
  }
  if (section === "Pending") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }
  if (section === "Completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  function onAddTodo(todo) {
    setTodos((todos) => {
      todo.id = todos.length + 1;
      return [...todos, todo];
    });
  }

  function onCompleteTodo(todoId) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function onDeleteTodo(todId) {
    setTodos((todos) => todos.filter((todo) => todo.id !== todId));
  }

  return (
    <div className="app">
      <h1>To-Do List App</h1>
      <TodoCreator onAddTodo={onAddTodo} />
      <TodoSection section={section} setSection={setSection} />
      <TodoList>
        {todos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))
        ) : (
          <h3>Todo List empty</h3>
        )}
      </TodoList>
    </div>
  );
}

export default App;
