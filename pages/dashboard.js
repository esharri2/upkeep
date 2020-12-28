// Libs
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import Button from "../components/Button";
import CheckmarkSVG from "../media/icons/checkmark.svg";
import HomeSVG from "../media/icons/home.svg";
import CrossSVG from "../media/icons/cross.svg";
import Link from "../components/Link";
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

export default function Dashboard(props) {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/dashboard", token], getDashboard);
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(router.query?.isNewUser);
  return (
    <PrivateLayout>
      <h1>My home</h1>
      {showWelcome && (
        <section className="welcome fade-in">
          <span className="button-wrapper">
            <Button
              onClick={() => {
                setShowWelcome(false);
              }}>
              <span className="sr-only">Close Welcome message</span>
              <Icon marginRight="0">
                <CrossSVG />
              </Icon>
            </Button>
          </span>
          <h2>Welcome to Upkeep!</h2>
          <p>This is your dashboard. </p>
          <p>
            We recommend that you start by updating all your tasks with the
            last-completed date. Then we can tell you when the task is due
            again. If you've never completed a task, just use the purchase date
            for the asset.
          </p>
          <p>
            Go to <b>Manage assets</b> to add or drop assets from your home and
            update details.
          </p>
          <p>
            Go to <b>View and update tasks</b> to see all of your tasks, when
            they're due, and add or update details about each task.'
          </p>
        </section>
      )}
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <div className="tiles">
          <div className="tile">
            <LinkAsButton
              block
              bigText
              large
              centerText
              href="/assets"
              width="100%">
              <Icon>
                <HomeSVG />
              </Icon>
              Manage assets
            </LinkAsButton>
          </div>
          <div className="tile">
            <LinkAsButton
              block
              large
              bigText
              centerText
              href="/tasks"
              width="100%">
              <Icon>
                <TodoSVG />
              </Icon>
              View and update tasks
            </LinkAsButton>
          </div>
          <div className="tile border">
            <h2>Asset summary</h2>
            <OwnedAssets owned={data?.ownedAssets} total={data?.totalAssets} />
          </div>
          <div className="tile border">
            <h2>Tasks to update</h2>
            <TasksWithoutHistory
              tasksWithoutHistory={data?.tasksWithoutHistory}
            />
          </div>
          <div className="tile border">
            <h2>Overdue tasks</h2>
            <OverdueTasks overdueTasks={data?.overdueTasks} />
          </div>
        </div>
      )}

      <style jsx>
        {`
          .welcome {
            border-radius: ${theme.borders.radius};
            border: solid 6px ${theme.colors.accent1};
            background-color: ${theme.colors.light};
            color: ${theme.colors.accent1};
            margin: ${theme.spacing.m} 0;
            padding: ${theme.spacing.m};
            position: relative;
            box-shadow: ${theme.shadows.l};
          }

          .welcome .button-wrapper {
            position: absolute;
            right: ${theme.spacing.s};
            top: ${theme.spacing.s};
          }
          .welcome h2 {
            margin: 0;
          }

          .welcome p {
            margin-top: ${theme.spacing.s};
            max-width: 700px;
          }

          .tiles {
            font-size: ${theme.fontSizes.l};
          }

          .tile {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: ${theme.spacing.m};
            border-radius: ${theme.borders.radius};
          }

          .tile:nth-of-type(1),
          .tile:nth-of-type(2) {
            padding-left: 0;
            padding-right: 0;
          }

          .tile.border {
            border-bottom: solid 1px ${theme.colors.middle};
          }

          @media screen and (${theme.mediaQueries.desktop}) {
            .tile.border {
              border: solid 1px ${theme.colors.middle};
            }
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
  return (
    <>
      {overdueTasks.length === 1 && (
        <p>
          You have <em className="error">{overdueTasks.length}</em> task that is
          overdue.
        </p>
      )}
      {overdueTasks.length > 1 && (
        <p>
          You have <em className="error">{overdueTasks.length}</em> tasks that
          are overdue.
        </p>
      )}
      {overdueTasks.length === 0 && (
        <>
          <p className="note">You don't have any overdue tasks.</p>
        </>
      )}

      {overdueTasks.map((task) => (
        <div key={task._id} className="task-card fade-in">
          <div className="listing">
            <span className="asset">{task.asset}: </span>
            <span className="task">{task.name}</span>
          </div>
          <LinkAsButton
            href={{
              pathname: "/tasks/[id]/complete",
              query: {
                asset: task.asset,
                task: task.name,
              },
            }}
            as={`/tasks/${task._id}/complete`}
            width="100%">
            <Icon width="1rem">
              <CheckmarkSVG />
            </Icon>
            Update
          </LinkAsButton>
        </div>
      ))}
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
          width: 100%;
        }

        .note {
          text-align: center;
        }

        .listing {
          margin: ${theme.spacing.s} 0;
        }
      `}</style>
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
          Update these soon so we can tell you when they are due again!
        </p>
      ) : (
        <p className="note success">Nice!</p>
      )}
      <>
        {tasksWithoutHistory.map((task) => (
          <div key={task._id} className="task-card fade-in">
            <div className="listing">
              <span className="asset">{task.asset}: </span>
              <span className="task">{task.name}</span>
            </div>
            <LinkAsButton
              href={{
                pathname: "/tasks/[id]/complete",
                query: {
                  asset: task.asset,
                  task: task.name,
                },
              }}
              as={`/tasks/${task._id}/complete`}
              width="100%">
              <Icon width="1rem">
                <CheckmarkSVG />
              </Icon>
              Update
            </LinkAsButton>
          </div>
        ))}
      </>
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
          width: 100%;
        }

        .note {
          text-align: center;
        }

        .listing {
          margin: ${theme.spacing.s} 0;
        }
      `}</style>
    </>
  );
};
