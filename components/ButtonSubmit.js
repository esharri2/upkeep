//Libs
import css from "styled-jsx/css";

// Components
import Button from "./Button";

const { className, styles } = css.resolve`
  button {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default function ButtonSubmit({
  children = "Submit",
  isSubmitting,
  formHasChanged = true,
  isValid = true,
}) {
  console.log(isValid, " isvalid?");
  return (
    <Button
      className={className}
      disabled={isSubmitting || !formHasChanged || !isValid}
      type="submit">
      {isSubmitting ? "Submitting" : children}
      {styles}
    </Button>
  );
}
