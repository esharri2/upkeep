// Libs
import css from "styled-jsx/css";

// Components
import Icon from "./Icon";
import GearSVG from "../media/icons/gear.svg";

const { className, styles } = css.resolve`
  @keyframes rotate {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(359deg);
    }
  }

  div {
    animation: rotate 2s ease-in-out infinite;
  }
`;

export default function Spinner({ width = "100%" }) {
  return (
    <Icon className={className} width={width}>
      <GearSVG />
      {styles}
    </Icon>
  );
}
