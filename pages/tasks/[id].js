//Libs
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../components/Back";
import TaskForm from "../../components/forms/TaskForm";
import PrivateLayout from "../../components/PrivateLayout";

//Utils
import { getTasks, postTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;

  const { token } = useUser();

  const { data, error } = useSWR([`/api/tasks/${id}`, token], getTasks);

  return (
    <PrivateLayout narrow>
      <Back href="/tasks" />
      {error && <p>Failed to load</p>}
      {!data && <p>loading...</p>}
      {data && (
        <>
          <h1>{data.task.name}</h1>
          <TaskForm task={data.task} />
        </>
      )}
    </PrivateLayout>
  );
}
