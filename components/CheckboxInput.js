import { Field } from "formik";

export default function CheckboxInput(props) {
  return (
    <label>
      <Field name={props.name} type="checkbox" />
      Show owned
    </label>
  );
}
