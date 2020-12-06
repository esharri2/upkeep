// Libs
import useSWR from "swr";

// Components
import Link from "../components/Link";
import LinkAsButton from "../components/LinkAsButton";

import PrivateLayout from "../components/PrivateLayout";

// Utils
import { getDashboard } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";
import theme from "../styles/theme";

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
      <div className="tiles">
        <div className="tile">
          <LinkAsButton bigText href="/assets">
            Manage assets
          </LinkAsButton>
        </div>
        <div className="tile">
          <LinkAsButton bigText href="/tasks">
            Manage tasks
          </LinkAsButton>
        </div>
        <div className="tile">
          <p>
            You own <em>{ownedAssets}</em> of <em>{totalAssets}</em> available
            assets.
          </p>
        </div>
        <div className="tile">
          <p>
            You have <em>{tasksWithoutHistory.length}</em> tasks with no
            history.
          </p>
        </div>
        <div className="tile">
          <p>
            You have <em>{overdueTasks.length}</em> tasks that are overdue.
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .tiles {
            font-size: ${theme.fontSizes.l};
          }

          .tile {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-bottom: solid 1px ${theme.colors.middle};
            padding: ${theme.spacing.l};
          }

          .tile:nth-of-type(1) {
            grid-column: 1/4;
          }
          .tile:nth-of-type(2) {
            grid-column: 4/7;
          }
          .tile:nth-of-type(3) {
            grid-column: 1/3;
          }
          .tile:nth-of-type(4) {
            grid-column: 3/5;
          }
          .tile:nth-of-type(5) {
            grid-column: 5/7;
          }

          p {
            margin: 0;
          }

          em {
            font-weight: 600;
            font-style: normal;
            color: ${theme.colors.accent1};
          }

          @media screen and (${theme.mediaQueries.desktop}) {
            .tiles {
              display: grid;
              grid-gap: 2rem;
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: 1fr 1fr;
            }
          }
        `}
      </style>
    </PrivateLayout>
  );
}
