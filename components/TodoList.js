import useSWR from "swr";
import { getTodos } from "../utils/client/fetchers";
import DeleteTodo from "./DeleteTodo";
import useUser from "../hooks/useUser";

export default function TodoList(props) {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/todos", token], getTodos);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { todos = [] } = data;

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map(({ text, _id }) => (
            <li key={_id}>
              {text} | <DeleteTodo id={_id} token={token} />
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any todos yet.</p>
      )}
    </>
  );
}
