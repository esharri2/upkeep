import theme from "../styles/theme";

export default function Button({
  children,
  disabled,
  onClick,
  type = "button",
}) {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>
      {children}
      <style jsx>
        {`
          button {
            padding: 10px;
            background-color: ${theme.colors.accent1};
            color: ${theme.colors.light};
            border: none;
            font-family: inherit;
            border-radius: ${theme.borders.radius};
            font-size: ${theme.fontSizes.l};
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
