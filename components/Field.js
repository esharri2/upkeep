// Libs
import css from "styled-jsx/css";
import { Field as FormikField } from "formik";

// Utils
import theme from "../styles/theme";

function getLinkStyles(noMargin) {
  return css.resolve`
    input,
    textarea {
      transition: border-color ${theme.timings.fast};
      width: 100%;
      border-radius: ${theme.borders.radius};
      border: solid 1px ${theme.colors.middle};
      display: block;
      padding: ${theme.spacing.s};
      margin-bottom: ${noMargin ? 0 : theme.spacing.m};
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: ${theme.colors.accent1};
    }

    textarea {
      min-height: ${theme.spacing.xxl};
    }

    select {
      border-color: ${theme.colors.middle};
      border-radius: ${theme.borders.radius};
      padding: ${theme.spacing.s};
      margin: 0 ${theme.spacing.s};
    }
  `;
}

export default function Field(props) {
  const { className, styles } = getLinkStyles(props.noMargin);

  return (
    <>
      <FormikField
        className={className}
        as={props.as}
        name={props.name}
        type={props.type}>
        {props.children}
      </FormikField>
      {styles}
    </>
  );
}
