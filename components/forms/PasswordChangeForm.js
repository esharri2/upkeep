// Libs
import { Formik, Form, ErrorMessage } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import FormErrorMessage from "./FormErrorMessage";
import Link from "../Link";

// Utils
import logout from "../../utils/client/logout";
import { postPassword } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function PasswordChangeForm(props) {
  const { token, setUser } = useUser();
  const { setStatus } = useStatus();

  const handleSubmit = async (values) => {
    const { oldPassword, newPassword } = values;
    postPassword(token, { body: JSON.stringify({ oldPassword, newPassword }) })
      .then(() => {
        logout(setUser, true);
        setStatus({
          type: "success",
          message: `Your password has been changed. ${(
            <Link href="/login">Please log in with your new password.</Link>
          )} `,
        });
      })
      .catch((error) => setStatus({ type: "error" }));
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
      errors.newPasswordMatch = "Your new passwords do not match.";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "", newPasswordMatch: "" }}
      onSubmit={async (values) => handleSubmit(values)}
      validate={handleFormValidatation}>
      {({ dirty, isSubmitting, isValid }) => (
        <Form>
          <div>
            <label htmlFor="oldPassword">Old password:</label>
            <Field name="oldPassword" type="password" />
            <ErrorMessage name="oldPassword" component={FormErrorMessage} />
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
            isSubmitting={isSubmitting}
            formHasChanged={dirty}
            isValid={isValid}
          />
        </Form>
      )}
    </Formik>
  );
}
