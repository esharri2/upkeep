// Components
import Icon from "./Icon";
import WarningSVG from "../media/icons/warning.svg";

// Utils
import theme from "../styles/theme";

export default function Warning({ children }) {
  return (
    <div>
      <Icon>
        <WarningSVG />
      </Icon>
      {children}
      <style jsx>
        {`
          div {
            margin: ${theme.spacing.m} 0;
            color: ${theme.colors.dark};
            background-color: ${theme.colors.warning};
            border-radius: ${theme.borders.radius};
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: ${theme.spacing.m};
          }

          p:not(:first-of-type) {
            margin-top: 0;
          }
        `}
      </style>
    </div>
  );
}
