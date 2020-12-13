// Libs
import { Formik, Form } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";

// Utils
import { postForgotPassword } from "../../utils/client/fetchers";
import useStatus from "../../hooks/useStatus";

export default function ForgotPasswordForm(props) {
  const { setStatus } = useStatus();

  const handleSubmit = async (values) => {
    const { email } = values;
    postForgotPassword({ body: JSON.stringify({ email }) })
      .then(() => {
        setStatus({ type: "success" });
      })
      .catch((error) => setStatus({ type: "error", message: error }));
  };

  return (
    <Formik
      initialValues={{ email: "", newPassword: "", newPasswordMatch: "" }}
      onSubmit={async (values) => handleSubmit(values)}>
      {({ dirty, isSubmitting }) => (
        <Form>
          <label htmlFor="email">Email:</label>
          <Field name="email" type="email" />
          <ButtonSubmit isSubmitting={isSubmitting} formHasChanged={dirty}>
            Send email
          </ButtonSubmit>
        </Form>
      )}
    </Formik>
  );
}
