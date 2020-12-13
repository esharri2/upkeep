//Libs
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../../components/Back";
import CheckmarkSVG from "../../../media/icons/checkmark.svg";
import DueIn from "../../../components/DueIn";
import Icon from "../../../components/Icon";
import LinkAsButton from "../../../components/LinkAsButton";
import LocaleDate from "../../../components/LocaleDate";
import PrivateLayout from "../../../components/PrivateLayout";
import SpinnerInPage from "../../../components/SpinnerInPage";
import TaskForm from "../../../components/forms/TaskForm";
import WarningFailedToLoad from "../../../components/WarningFailedToLoad";

//Utils
import { getTasks } from "../../../utils/client/fetchers";
import theme from "../../../styles/theme";
import useUser from "../../../hooks/useUser";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useUser();
  const { data, error } = useSWR([`/api/tasks/${id}`, token], getTasks);

  return (
    <PrivateLayout narrow>
      <Back href="/tasks" />
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
                href="/tasks/[id]/complete"
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
                <b>Mark complete</b> to update the last time you completed it.
              </p>
            )}
            <ol>
              {data.task.instances.map((instance, index) => (
                <li key={index}>
                  <LocaleDate date={instance.date} />
                  {instance.note && <p>Notes: {instance.note}</p>}
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

        section:first-of-type {
          padding-top: 0;
        }

        h2 {
          margin-top: 0;
        }
      `}</style>
    </PrivateLayout>
  );
}
