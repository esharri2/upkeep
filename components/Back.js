// Libs
import css from "styled-jsx/css";

// Components
import ChevronLeftSVG from "../media/icons/chevron-left.svg";
import Icon from "./Icon";
import Link from "./Link";

// Utils
import theme from "../styles/theme";

const { className, styles } = css.resolve`
  a {
    /* background-color: red; */
    display: block;
    color: ${theme.colors.accent1};
    fill: ${theme.colors.accent1};
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default function Back({
  href = "/dashboard",
  className: parentClassName,
  label = "Dashboard",
}) {
  return (
    <Link className={`${parentClassName} ${className}`} href={href}>
      <Icon>
        <ChevronLeftSVG />
      </Icon>
      {label}
      {styles}
    </Link>
  );
}
