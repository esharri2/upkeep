// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import EditSVG from "../media/icons/pencil.svg";
import Icon from "./Icon";
import LinkAsButton from "./LinkAsButton";

// Utils
import theme from "../styles/theme";

export default function TaskCard({ task }) {
  const { _id, asset, dueIn } = task;
  return (
    <section>
      <h2>
        <span>{asset}:</span> {task.name}
      </h2>
      <p>
        {dueIn ? `Due in ${dueIn} days.` : "There is no history for this task."}
      </p>
      <div>
        <LinkAsButton reverse href="/tasks/[id]" as={`/tasks/${_id}`}>
          <Icon width="1rem">
            <EditSVG />
          </Icon>
          Edit details
        </LinkAsButton>
        <LinkAsButton href="/tasks/[id]/complete" as={`/tasks/${_id}/complete`}>
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
