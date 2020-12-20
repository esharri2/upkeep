// Libs
import { Field } from "formik";
import css from "styled-jsx/css";

// Utils
import theme from "../styles/theme";

const { className, styles } = css.resolve`
  input {
    height: 25px;
    width: 25px;
    position: relative;
    margin-right: ${theme.spacing.s};
  }

  input:before {
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.light};
    position: absolute;
    left: 0;
    border-radius: ${theme.borders.radius};
    border: solid 3px ${theme.colors.accent1};
    transition: border ${theme.timings.fast},
      background-color ${theme.timings.fast};
  }

  input:checked:before {
    content: "✔";
    color: ${theme.colors.light};
    border-color: transparent;
    background-color: ${theme.colors.accent1};
  }
`;

export default function CheckboxInput(props) {
  return (
    <label className={props.className}>
      <Field
        className={className}
        name={props.name}
        value={props.value}
        type="checkbox"
      />
      {props.children}
      {styles}
      <style jsx>{`
        label {
          display: inline-flex;
          align-items: center;
          position: relative;
        }

        label:not(:first-of-type) {
          margin-left: ${theme.spacing.m};
        }
      `}</style>
    </label>
  );
}
