// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import DueIn from "./DueIn";
import EditSVG from "../media/icons/pencil.svg";
import Icon from "./Icon";
import LinkAsButton from "./LinkAsButton";

// Utils
import theme from "../styles/theme";

export default function TaskCard({ task }) {
  const { _id, asset, dueIn, name } = task;

  return (
    <section className="fade-in">
      <h2>
        <span>{asset}:</span> {task.name}
      </h2>
      <DueIn dueIn={dueIn} />
      <div>
        <LinkAsButton reverse href="/tasks/[id]" as={`/tasks/${_id}`}>
          <Icon width="1rem">
            <EditSVG />
          </Icon>
          Edit details
        </LinkAsButton>
        <LinkAsButton
          href={{
            pathname: "/tasks/[id]/complete",
            query: {
              asset,
              task: name,
            },
          }}
          as={`/tasks/${_id}/complete`}>
          <Icon width="1rem">
            <CheckmarkSVG />
          </Icon>
          Mark complete
        </LinkAsButton>
      </div>

      <style jsx>{`
        section {
          padding: ${theme.spacing.m} 0;
          fill: ${theme.colors.accent1};
          border-bottom: solid 1px ${theme.colors.middle};
        }

        span {
          color: ${theme.colors.accent1};
          font-weight: 300;
        }

        div {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </section>
  );
}
