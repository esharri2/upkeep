import CheckmarkSVG from "../media/icons/checkmark.svg";
import Icon from "./Icon";
import WarningSVG from "../media/icons/warning.svg";

import theme from "../styles/theme";

export default function DueIn({ dueIn }) {
  let dueInText = "";
  let dueInClass;
  if (!dueIn && dueIn !== 0) {
    dueInText =
      "There is no history for this task. Mark it complete with the last-completed date (or purchase date).";
    dueInClass = "error";
  } else if (dueIn === 0) {
    dueInText = "This task is due today!";
    dueInClass = "warning";
  } else if (dueIn < 0) {
    dueInClass = "error";
    dueInText = `This task is overdue by ${dueIn * -1} days.`;
  } else if (dueIn < 10) {
    dueInClass = "warning";
    dueInText = `This task is due in ${dueIn} days.`;
  } else {
    dueInClass = "success";
    dueInText = `This task is due in ${dueIn} days.`;
  }

  return (
    <div className={`dueIn ${dueInClass}`}>
      <Icon width="2rem">
        {dueInClass === "warning" || dueInClass === "error" ? (
          <WarningSVG />
        ) : (
          <CheckmarkSVG />
        )}
      </Icon>
      {dueInText}
      <style jsx>{`
        .dueIn {
          display: flex;
          align-items: center;
          margin: ${theme.spacing.m} 0;
        }

        .warning {
          fill: ${theme.colors.warning};
        }

        .error {
          fill: ${theme.colors.error};
          color: ${theme.colors.error};
        }

        .success {
          fill: ${theme.colors.success};
          color: ${theme.colors.success};
        }
      `}</style>
    </div>
  );
}
