// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import EditSVG from "../media/icons/pencil.svg";
import Icon from "./Icon";
import LinkAsButton from "./LinkAsButton";

// Utils
import theme from "../styles/theme";

export default function TaskCard({ task }) {
  console.log(task);
  return (
    <section>
      <h2>
        <span>{task.asset}:</span> {task.name}
      </h2>
      <div>
        <LinkAsButton reverse href={`/tasks/${task._id}`}>
          <Icon width="1rem">
            <EditSVG />
          </Icon>
          Edit details
        </LinkAsButton>
        <LinkAsButton href={`/tasks/complete/${task._id}`}>
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
