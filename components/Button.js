import theme from "../styles/theme";

export default function Button({
  children,
  className,
  disabled,
  onClick,
  type = "button",
  reverse,
}) {
  return (
    <button
      className={className}
      disabled={disabled}
      type={type}
      onClick={onClick}>
      {children}
      <style jsx>
        {`
          button {
            display: inline-flex;
            align-items: center;
            padding: 10px;
            background-color: ${reverse
              ? theme.colors.light
              : theme.colors.accent1};
            fill: ${reverse ? theme.colors.accent1 : theme.colors.light};
            color: ${reverse ? theme.colors.accent1 : theme.colors.light};
            border: none;
            font-family: inherit;
            border-radius: ${theme.borders.radius};
            font-size: ${theme.fontSizes.m};
            box-shadow: ${theme.shadows.s};
            transition: filter ${theme.timings.fast},
              box-shadow ${theme.timings.fast},
              background-color ${theme.timings.fast};
          }

          button:hover {
            filter: ${theme.hoverEffects.filter};
          }

          button[disabled] {
            background-color: ${theme.colors.disabled};
            box-shadow: none;
          }
        `}
      </style>
    </button>
  );
}
