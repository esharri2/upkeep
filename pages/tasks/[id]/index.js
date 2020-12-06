//Libs
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../../components/Back";
import CheckmarkSVG from "../../../media/icons/checkmark.svg";
import Icon from "../../../components/Icon";
import LinkAsButton from "../../../components/LinkAsButton";
import TaskForm from "../../../components/forms/TaskForm";
import PrivateLayout from "../../../components/PrivateLayout";

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
      {error && <p>Failed to load</p>}
      {!data && <p>loading...</p>}
      {data && (
        <>
          <h1>
            <span>{data.task.asset}:</span> {data.task.name}
          </h1>

          <section>
            <p>{data.task.description}</p>
            <div className="complete">
              {/* todo fix this */}
              <p>
                {data.task.dueIn
                  ? `Due in ${data.task.dueIn} days`
                  : "Mark this task complete to add the last date you did it. Then we can tell when it's due again!"}
              </p>
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
                You don't have any records of doing this task. Click here to
                record the last time you completed it.
              </p>
            )}
            {data.task.instances.map((instance) => instance.date)}
          </section>
        </>
      )}
      <style jsx>{`
        span {
          color: ${theme.colors.accent1};
          font-weight: 300;
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

        .complete {
          display: flex;
          align-items: center;
          margin-top: ${theme.spacing.l};
        }

        .complete p {
          margin: 0 ${theme.spacing.l} 0 0;
          font-weight: 600;
          flex: 0 0 50%;
        }
      `}</style>
    </PrivateLayout>
  );
}
