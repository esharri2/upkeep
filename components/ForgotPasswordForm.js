// Libs
import { Formik, Form, Field } from "formik";

// Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

// Utils
import { postForgotPassword } from "../utils/client/fetchers";

export default function ForgotPasswordForm(props) {
  const handleSubmit = async (values, setStatus) => {
    const { email } = values;
    postForgotPassword({ body: JSON.stringify({ email }) })
      .then(() => {
        setStatus({ success: true });
      })
      .catch((error) => setStatus(error));
  };

  return (
    <Formik
      initialValues={{ email: "", newPassword: "", newPasswordMatch: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status }) => (
        <Form>
          <label htmlFor="email">Email:</label>
          <Field name="email" type="email" />
          <button disabled={isSubmitting || !dirty} type="submit">
            Send email
          </button>
          <Notification role="alert">
            {status?.error && <ServerErrorMessage error={status.error} />}
            {status?.success && (
              <p>Check your email for a password reset link.</p>
            )}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
