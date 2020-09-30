// Libs
import css from "styled-jsx/css";

// Components
import Button from "./Button";

// Utils
import theme from "../styles/theme";

const { className, styles } = css.resolve`
  button {
    position: absolute;
    right: ${theme.spacing.l};
    top: ${theme.spacing.l};
  }
`;

export default function BackToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button reverse onClick={handleClick} className={className}>
      Back to top
      {styles}
    </Button>
  );
}
