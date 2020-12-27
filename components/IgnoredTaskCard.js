// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import DueIn from "./DueIn";
import EditSVG from "../media/icons/pencil.svg";
import Icon from "./Icon";
import LinkAsButton from "./LinkAsButton";

// Utils
import theme from "../styles/theme";

export default function TaskCard({ task }) {
  const { _id, asset, name } = task;

  return (
    <section className="fade-in">
      <h2>
        <span>{asset}:</span> {name}
      </h2>
      <div>
        <LinkAsButton reverse href="/tasks/[id]" as={`/tasks/${_id}`}>
          <Icon width="1rem">
            <EditSVG />
          </Icon>
          Edit details
        </LinkAsButton>
      </div>

      <style jsx>{`
        section {
          padding: ${theme.spacing.m} 0;
          fill: ${theme.colors.accent1};
          border-bottom: solid 1px ${theme.colors.middle};
        }
        h2 {
          color: ${theme.colors.disabledText};
          font-size: ${theme.fontSizes.m};
        }
        span {
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
