// Libs

// Components
import PrivateLayout from "../components/PrivateLayout";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

// Utils

export default function Todos() {
  return (
    <PrivateLayout>
      <div>
        <h1>Todo Dashboard</h1>
        <TodoList />
        <TodoForm />
      </div>
    </PrivateLayout>
  );
}
