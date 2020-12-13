// Libs
import { Formik, Form, Field, ErrorMessage } from "formik";

// Components
import FormErrorMessage from "../FormErrorMessage";

// Utils
import { postResetPassword } from "../../utils/client/fetchers";
import logout from "../../utils/client/logout";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function PasswordResetForm({ resetPasswordToken }) {
  const { setUser } = useUser();
  const { setStatus } = useStatus();

  const handleSubmit = async (values) => {
    const { email, newPassword } = values;
    postResetPassword({
      body: JSON.stringify({ email, newPassword, resetPasswordToken }),
    })
      .then(() => {
        logout(setUser);
        setStatus({
          type: "success",
          message:
            "Your password has been reset. Please log in with your new password",
        });
      })
      .catch((error) => setStatus({ type: "error", message: error }));
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
      onSubmit={async (values) => handleSubmit(values)}
      validate={handleFormValidatation}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component={FormErrorMessage} />
          </div>
          <div>
            <label htmlFor="newPassword">New password:</label>
            <Field name="newPassword" type="password" maxLength="50" />
            <ErrorMessage name="newPassword" component={FormErrorMessage} />
          </div>
          <div>
            <label htmlFor="newPasswordMatch">Retype new password:</label>
            <Field name="newPasswordMatch" type="password" />
            <ErrorMessage
              name="newPasswordMatch"
              component={FormErrorMessage}
            />
          </div>
          <ButtonSubmit
            disabled={isSubmitting | !dirty}
            isSubmitting={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
