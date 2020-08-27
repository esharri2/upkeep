// Libs
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

// Utils
import { postResetPassword } from "../utils/client/fetchers";
import logout from "../utils/client/logout";
import useUser from "../hooks/useUser";

export default function PasswordResetForm({ resetPasswordToken }) {
  const { setUser } = useUser();

  const handleSubmit = async (values, setStatus) => {
    const { email, newPassword } = values;
    postResetPassword({
      body: JSON.stringify({ email, newPassword, resetPasswordToken }),
    })
      .then(() => {
        logout(setUser);
        setStatus({ success: true });
      })
      .catch((error) => setStatus(error));
  };

  const handleFormValidatation = ({ email, newPassword, newPasswordMatch }) => {
    const errors = {};

    if (!email) {
      errors.email = "Required.";
    }

    if (newPasswordMatch && newPassword !== newPasswordMatch) {
      errors.newPasswordMatch = "Doesn't not match!";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", newPassword: "", newPasswordMatch: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }
      validate={handleFormValidatation}>
      {({ isSubmitting, status = {} }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="newPassword">New password:</label>
            <Field name="newPassword" type="password" maxLength="50" />
            <ErrorMessage name="newPassword" />
          </div>
          <div>
            <label htmlFor="newPasswordMatch">Retype new password:</label>
            <Field name="newPasswordMatch" type="password" />
            <ErrorMessage name="newPasswordMatch" />
          </div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
          <Notification role="alert">
            {status.error && <ServerErrorMessage error={status.error} />}
            {status.success && (
              <p>
                <p>Your password has been successfully reset!</p>
                <Link href="/login">
                  <a>Please log in with your new password.</a>
                </Link>
              </p>
            )}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
