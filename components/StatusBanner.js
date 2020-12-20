import { useEffect } from "react";
import theme from "../styles/theme";

// Components
import CheckmarkSVG from "../media/icons/checkmark.svg";
import Icon from "./Icon";
import WarningSVG from "../media/icons/warning.svg";

// Utils
import useStatus from "../hooks/useStatus";

export default function StatusBanner() {
  const { status, removeStatus } = useStatus();

  return (
    <div role="status">
      {status.map((item) => {
        const { message, time, type } = item;
        return (
          <StatusMessage
            message={message}
            time={time}
            type={type}
            key={time}
            removeStatus={removeStatus}
          />
        );
      })}
      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
}

const StatusMessage = ({ message, time, type = "warning", removeStatus }) => {
  // Set default message for when there is no message prop
  const defaultMessage =
    type === "success"
      ? "Saved!"
      : "Whoops, there was a problem! Try again later.";

  // Let's do a little longer duration on error and warning messages.
  const successMultipler = 2;
  const errorMultipler = 5;
  const duration =
    (type === "success" ? successMultipler : errorMultipler) * 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      removeStatus(time);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={type}>
      <Icon>{type === "success" ? <CheckmarkSVG /> : <WarningSVG />}</Icon>
      <p>{typeof message === "string" ? message : defaultMessage}</p>
      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
          color: ${theme.colors.light};
          fill: ${theme.colors.light};
          opacity: 0;
          box-shadow: ${theme.shadows.m};
        }
        .success {
          background-color: ${theme.colors.success};
          animation: ${successMultipler}s ease-in 1 slideDown;
        }

        .error {
          background-color: ${theme.colors.error};
        }

        .warning {
          background-color: ${theme.colors.warning};
        }

        .error,
        .warning {
          animation: ${errorMultipler}s ease-in 1 slideDown;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          10% {
            transform: translateY(0%);
            opacity: 1;
          }

          95% {
            transform: translateY(0%);
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
