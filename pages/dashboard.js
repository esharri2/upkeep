// Libs
import useSWR from "swr";

// Components
import Link from "../components/Link";
import PrivateLayout from "../components/PrivateLayout";

// Utils
import { getDashboard } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function Dashboard() {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/dashboard", token], getDashboard);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const {
    ownedAssets,
    totalAssets,
    tasksWithoutHistory,
    overdueTasks,
    dueSoonTasks,
  } = data;

  return (
    <PrivateLayout>
      <h1>Dashboard</h1>
      {error && <div>failed to load</div>}
      {!data && <div>loading..</div>}
      <div>
        You own {ownedAssets} of {totalAssets} assets
      </div>
      <div>You have {tasksWithoutHistory.length} tasks with no history.</div>
      <div>You have {overdueTasks.length} tasks that are overdue.</div>
      <Link href="/assets">
        <a>Manage assets</a>
      </Link>
      <Link href="/tasks">
        <a>Manage tasks</a>
      </Link>
    </PrivateLayout>
  );
}
