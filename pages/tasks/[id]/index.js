//Libs
import css from "styled-jsx/css";
import useSWR from "swr";
import { mutate } from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../../components/Back";
import Button from "../../../components/Button";
import CheckmarkSVG from "../../../media/icons/checkmark.svg";
import DueIn from "../../../components/DueIn";
import Icon from "../../../components/Icon";
import LinkAsButton from "../../../components/LinkAsButton";
import LocaleDate from "../../../components/LocaleDate";
import PrivateLayout from "../../../components/PrivateLayout";
import SpinnerInPage from "../../../components/SpinnerInPage";
import TaskForm from "../../../components/forms/TaskForm";
import TrashSVG from "../../../media/icons/trash.svg";
import WarningFailedToLoad from "../../../components/WarningFailedToLoad";

//Utils
import { deleteInstances, getTasks } from "../../../utils/client/fetchers";
import theme from "../../../styles/theme";
import useUser from "../../../hooks/useUser";
import useStatus from "../../../hooks/useStatus";

// Delete button
const { className, styles } = css.resolve`
  button {
    position: absolute;
    right: 0;
    top: ${theme.spacing.m};
  }
`;

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useUser();
  const { setStatus } = useStatus();
  const { data, error } = useSWR([`/api/tasks/${id}`, token], getTasks);

  const handleRemoveInstance = (event) => {
    const instanceId = event.target.closest("[data-id]").dataset.id;
    deleteInstances(token, instanceId, id)
      .then(() => {
        setStatus({ type: "success", message: "Task history item deleted." });
        mutate([`/api/tasks/${id}`, token]);
      })
      .catch((error) => setStatus({ type: "error", message: error }));
  };

  return (
    <PrivateLayout narrow>
      <Back href="/tasks" label="Tasks" />
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <>
          <h1>
            <span>{data.task.asset}:</span> {data.task.name}
          </h1>

          <section>
            <p>{data.task.description}</p>
            <div className="complete">
              <DueIn dueIn={data.task.dueIn} />
              <LinkAsButton
                href={{
                  pathname: "/tasks/[id]/complete",
                  query: {
                    asset: data.task.asset,
                    task: data.task.name,
                  },
                }}
                as={`/tasks/${data.task._id}/complete`}>
                <Icon width="1rem">
                  <CheckmarkSVG />
                </Icon>
                Mark complete
              </LinkAsButton>
            </div>
          </section>
          <section>
            <h2>Update general task details</h2>
            <TaskForm task={data.task} />
          </section>
          <section>
            <h2>Task history</h2>
            {data.task.instances.length === 0 && (
              <p>
                You don't have any records of doing this task. Click
                <b> Mark complete</b> above to update the last time you
                completed it.
              </p>
            )}
            <ol>
              {data.task.instances.map((instance, index) => (
                <li data-id={instance._id} key={instance._id}>
                  <LocaleDate date={instance.date} />
                  {instance.note && <p>Notes: {instance.note}</p>}
                  <Button
                    onClick={handleRemoveInstance}
                    reverse
                    className={className}>
                    <Icon marginRight={0}>
                      <TrashSVG />
                    </Icon>
                    {styles}
                  </Button>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      <style jsx>{`
        span {
          color: ${theme.colors.accent1};
          font-weight: 300;
        }

        ol {
          margin: 0;
          padding: 0 0 0 ${theme.spacing.m};
        }

        section {
          padding: ${theme.spacing.l} 0 ${theme.spacing.l};
          border-bottom: solid 1px ${theme.colors.middle};
        }

        section:last-of-type {
          border: none;
        }

        section:first-of-type {
          padding-top: 0;
        }

        h2 {
          margin-top: 0;
        }

        li {
          padding: ${theme.spacing.l};
          border-bottom: solid 1px ${theme.colors.middle};
          position: relative;
        }
      `}</style>
    </PrivateLayout>
  );
}
