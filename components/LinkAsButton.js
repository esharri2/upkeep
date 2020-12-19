// Libs
import css from "styled-jsx/css";

// Components
import Link from "./Link";

// Utils
import theme from "../styles/theme";

function getLinkStyles(bigText, noBorder, centerText, reverse, width) {
  return css.resolve`
    a {
      display: inline-block;
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
      justify-content: ${centerText ? "center" : "flex-start"};
      width: ${width || "auto"};
    }

    a:hover {
      filter: ${theme.hoverEffects.filter};
    }
  `;
}

export default function LinkAsButton({
  as,
  children,
  href,
  bigText,
  noBorder,
  centerText,
  reverse,
  width,
}) {
  const { className, styles } = getLinkStyles(
    bigText,
    noBorder,
    centerText,
    reverse,
    width
  );

  return (
    <Link className={className} as={as} href={href}>
      {children}
      {styles}
    </Link>
  );
}
