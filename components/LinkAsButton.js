// Libs
import css from "styled-jsx/css";

// Components
import Link from "./Link";

// Utils
import theme from "../styles/theme";

function getLinkStyles(bigText, noBorder, reverse) {
  return css.resolve`
    a {
      padding: 10px;
      background-color: ${reverse ? theme.colors.light : theme.colors.accent1};
      color: ${reverse ? theme.colors.accent1 : theme.colors.light};
      fill: ${reverse ? theme.colors.accent1 : theme.colors.light};
      border: none;
      font-family: inherit;
      border-radius: ${theme.borders.radius};
      font-size: ${bigText ? theme.fontSizes.l : theme.fontSizes.m};
      box-shadow: ${noBorder ? "none" : theme.shadows.s};
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: filter ${theme.timings.fast};
    }

    a:hover {
      filter: ${theme.hoverEffects.filter};
    }
  `;
}

export default function LinkAsButton({
  children,
  href,
  bigText,
  noBorder,
  reverse,
}) {
  const { className, styles } = getLinkStyles(bigText, noBorder, reverse);

  return (
    <Link className={className} href={href}>
      {children}
      {styles}
    </Link>
  );
}
