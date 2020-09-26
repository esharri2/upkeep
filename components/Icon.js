export default function Icon({ children, rotate, width = "2rem" }) {
  return (
    <div className="icon">
      {children}

      <style jsx>{`
        div {
          width: ${width};
          transition: transform 0.2s;
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
