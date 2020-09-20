//Libs
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import TaskForm from "../../components/TaskForm";
import PrivateLayout from "../../components/PrivateLayout";

//Utils
import { getTasks, postTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;

  const { token } = useUser();

  const { data, error } = useSWR([`/api/assets/${id}`, token], getAssets);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <PrivateLayout>
      <h1>{data.asset.name}</h1>
      <TaskForm task={data.task} />
    </PrivateLayout>
  );
}
