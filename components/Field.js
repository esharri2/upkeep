// Libs
import css from "styled-jsx/css";
import { Field as FormikField } from "formik";

// Utils
import theme from "../styles/theme";

function getLinkStyles(noMargin) {
  return css.resolve`
    input {
      border: solid 1px ${theme.colors.middle};
      display: block;
      padding: ${theme.spacing.s};
      margin-bottom: ${noMargin ? 0 : theme.spacing.m};
      transition: border-color ${theme.timings.fast};
      width: 100%;
      border-radius: ${theme.borders.radius};
    }

    input:focus {
      outline: none;
      border-color: ${theme.colors.accent1};
    }
  `;
}

export default function Field(props) {
  const { className, styles } = getLinkStyles(props.noMargin);

  return (
    <>
      <FormikField className={className} {...props} />
      {styles}
    </>
  );
}
