// Libs
import useSWR from "swr";
import { useEffect, useState } from "react";

// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import HomeSVG from "../media/icons/home.svg";
import Icon from "../components/Icon";
import TodoSVG from "../media/icons/to-do.svg";
import WarningFailedToLoad from "../components/WarningFailedToLoad";
import LinkAsButton from "../components/LinkAsButton";
import PrivateLayout from "../components/PrivateLayout";

// Utils
import { getDashboard } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";
import theme from "../styles/theme";
import SpinnerInPage from "../components/SpinnerInPage";

export default function Dashboard() {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/dashboard", token], getDashboard);

  return (
    <PrivateLayout>
      <h1>My home</h1>
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <div className="tiles">
          <div className="tile">
            <LinkAsButton block bigText centerText href="/assets" width="80%">
              <Icon>
                <HomeSVG />
              </Icon>
              Manage assets
            </LinkAsButton>
          </div>
          <div className="tile">
            <LinkAsButton block bigText centerText href="/tasks" width="80%">
              <Icon>
                <TodoSVG />
              </Icon>
              View and update tasks
            </LinkAsButton>
          </div>
          <div className="tile">
            <OwnedAssets owned={data?.ownedAssets} total={data?.totalAssets} />
          </div>
          <div className="tile">
            <TasksWithoutHistory
              tasksWithoutHistory={data?.tasksWithoutHistory}
            />
          </div>
          <div className="tile">
            <OverdueTasks overdueTasks={data?.overdueTasks} />
          </div>
        </div>
      )}

      <style jsx>
        {`
          .tiles {
            font-size: ${theme.fontSizes.l};
          }

          .tile {
            display: flex;
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

          @media screen and (${theme.mediaQueries.desktop}) {
            .tiles {
              display: grid;
              grid-gap: 2rem;
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: auto;
            }
          }
        `}
      </style>
    </PrivateLayout>
  );
}

function OwnedAssets({ owned, total }) {
  // TODO - Tried this to be able to see transition but didn't work, just leave for now.
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent((owned / total) * 100);
    return () => {
      setPercent(0);
    };
  }, [owned, total]);

  let statusClass = "";
  if (percent < 35) {
    statusClass = "error";
  } else if (percent < 70) {
    statusClass = "warning";
  } else {
    statusClass = "success";
  }

  return (
    <>
      <p>
        You own <em>{owned}</em> of <em>{total}</em> available assets.
      </p>
      <div className="graph">
        {percent < 10 && (
          <span
            style={{
              color: theme.colors.dark,
              position: "absolute",
              top: "25%",
              right: theme.spacing.m,
            }}>
            {" "}
            {Math.ceil(percent)}%
          </span>
        )}
        <div style={{ width: `${percent}%` }} className={`bar ${statusClass}`}>
          {percent > 9 && <span> {Math.ceil(percent)}%</span>}
        </div>
      </div>

      {percent < 70 && (
        <p>
          <LinkAsButton href="/setup">Add more!</LinkAsButton>
        </p>
      )}
      <style jsx>{`
        .graph {
          width: 100%;
          height: 50px;
          background-color: ${theme.colors.disabled};
          border-radius: ${theme.borders.radius};
          position: relative;
        }

        .bar {
          height: 50px;
          padding: ${theme.spacing.m};
          transition: all 2s;
          border-radius: ${theme.borders.radius};
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: ${theme.colors.light};
        }

        .success {
          background-color: ${theme.colors.success};
        }

        .warning {
          background-color: ${theme.colors.warning};
          color: ${theme.colors.dark};
        }

        .error {
          background-color: ${theme.colors.error};
        }
      `}</style>
    </>
  );
}

const OverdueTasks = ({ overdueTasks }) => {
  console.log(overdueTasks);
  return (
    <>
      <p>
        You have <em>{overdueTasks.length}</em> tasks that are overdue.
      </p>
      {overdueTasks.map((task) => (
        <div className="task-card">
          <div className="listing">
            <span className="asset">{task.asset}: </span>
            <span className="task">{task.name}</span>
          </div>
          <LinkAsButton
            href="/tasks/[id]/complete"
            as={`/tasks/${task._id}/complete`}
            width="100%">
            <Icon width="1rem">
              <CheckmarkSVG />
            </Icon>
            Add date last completed
          </LinkAsButton>
        </div>
      ))}
    </>
  );
};

const TasksWithoutHistory = ({ tasksWithoutHistory }) => {
  const size = tasksWithoutHistory.length;
  return (
    <>
      <p>
        You have{" "}
        <em>
          <span className={size > 0 ? "error" : "success"}>{size}</span>
        </em>{" "}
        tasks with no history.
      </p>
      {size > 0 ? (
        <p className="note error">
          Update these ASAP so we can tell you when they're due again!
        </p>
      ) : (
        <p className="note success">Nice!</p>
      )}
      <div>
        {tasksWithoutHistory.map((task) => (
          <div className="task-card">
            <div className="listing">
              <span className="asset">{task.asset}: </span>
              <span className="task">{task.name}</span>
            </div>
            <LinkAsButton
              href="/tasks/[id]/complete"
              as={`/tasks/${task._id}/complete`}
              width="100%">
              <Icon width="1rem">
                <CheckmarkSVG />
              </Icon>
              Add date last completed
            </LinkAsButton>
          </div>
        ))}
      </div>
      <style jsx>{`
        .asset {
          color: ${theme.colors.accent1};
        }

        .error {
          color: ${theme.colors.error};
        }

        .success {
          color: ${theme.colors.success};
        }

        .task {
          font-weight: 700;
        }

        .task-card {
          margin: ${theme.spacing.m};
        }

        .note {
          text-align: center;
        }

        .listing,
        .note {
          margin: ${theme.spacing.s} 0;
        }
      `}</style>
    </>
  );
};
