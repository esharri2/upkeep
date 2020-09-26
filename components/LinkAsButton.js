// Libs
import css from "styled-jsx/css";

// Components
import Link from "./Link";

// Utils
import theme from "../styles/theme";

const { className, styles } = css.resolve`
  a {
    padding: 10px;
    background-color: ${theme.colors.accent1};
    color: ${theme.colors.light};
    border: none;
    font-family: inherit;
    border-radius: ${theme.borders.radius};
    font-size: ${theme.fontSizes.l};
    box-shadow: ${theme.shadows.s};
    text-decoration: none;
    display: inline-block;
    transition: filter ${theme.timings.fast};
  }

  a:hover {
    filter: ${theme.hoverEffects.filter};
  }
`;

export default function LinkAsButton({ children, href }) {
  return (
    <Link className={className} href={href}>
      {children}
      {styles}
    </Link>
  );
}
