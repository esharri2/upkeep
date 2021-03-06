import theme from "../styles/theme";

export default function Icon({
  children,
  className = "",
  marginRight = theme.spacing.s,
  rotate,
  width = "1.5rem",
}) {
  return (
    <div className={`icon ${className}`}>
      {children}

      <style jsx>{`
        div {
          width: ${width};
          flex-basis: ${width};
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          margin-right: ${marginRight};
        }
      `}</style>
      <style jsx>{`
        div {
          transform: ${rotate ? "rotate(180deg)" : "none"};
        }
      `}</style>
    </div>
  );
}
