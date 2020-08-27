// Libs
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";

// Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

// Utils
import logout from "../utils/client/logout";
import { postPassword } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function PasswordChangeForm(props) {
  const { token, setUser } = useUser();

  const handleSubmit = async (values, setStatus) => {
    const { oldPassword, newPassword } = values;
    postPassword(token, { body: JSON.stringify({ oldPassword, newPassword }) })
      .then(() => {
        logout(setUser, true);
        setStatus({ success: true });
      })
      .catch((error) => setStatus(error));
  };

  const handleFormValidatation = ({
    oldPassword,
    newPassword,
    newPasswordMatch,
  }) => {
    const errors = {};

    if (!oldPassword) {
      errors.oldPassword = "Required";
    }

    if (!newPassword) {
      errors.newPassword = "Required";
    }

    if (!newPasswordMatch) {
      errors.newPasswordMatch = "Required";
    }

    if (newPasswordMatch && newPassword !== newPasswordMatch) {
      errors.newPasswordMatch = "Doesn't not match!";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "", newPasswordMatch: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }
      validate={handleFormValidatation}>
      {({ dirty, isSubmitting, isValid, status }) => (
        <Form>
          <div>
            <label htmlFor="oldPassword">Old password:</label>
            <Field name="oldPassword" type="password" />
            <ErrorMessage name="oldPassword" />
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
          <button disabled={isSubmitting || !dirty || !isValid} type="submit">
            Submit
          </button>
          <Notification role="alert">
            {status?.error && <ServerErrorMessage error={status.error} />}
            {status?.success && (
              <p>
                Your password has been successfully changed!
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
