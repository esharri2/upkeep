// Libs
import { mutate } from "swr";

// Utils
import { deleteTodo } from "../utils/client/fetchers";

export default function DeleteTodo({ token, id }) {
  const handleClick = () => {
    deleteTodo(token, id)
      .then((data) => mutate(["/api/todos", token]))
      .catch((error) => alert(error));
  };

  return <button onClick={handleClick}>Delete</button>;
}
