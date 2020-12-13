import theme from "../../styles/theme";

export default function FormErrorMessage({ children }) {
  return (
    <p>
      {children}
      <style jsx>{`
        color: ${theme.colors.error};
      `}</style>
    </p>
  );
}
