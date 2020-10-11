//Libs
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../../../components/Back";
import PrivateLayout from "../../../../components/PrivateLayout";
import TaskForm from "../../../../components/forms/TaskForm";

//Utils
import { getTasks } from "../../../../utils/client/fetchers";
import useUser from "../../../../hooks/useUser";

export default function Task() {
  const router = useRouter();
  console.log(router.query);
  const { taskId } = router.query;

  const { token } = useUser();

  const { data, error } = useSWR([`/api/tasks/${taskId}`, token], getTasks);

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
