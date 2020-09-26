// Libs
import Router from "next/router";
import { Formik, Form, ErrorMessage } from "formik";

// Components
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

// Utils
import { postSignUp } from "../../utils/client/fetchers";
import ButtonSubmit from "../ButtonSubmit";

export default function SignUpForm(props) {
  const handleSubmit = async (values, setStatus) => {
    const { email, password } = values;

    try {
      await postSignUp({
        body: JSON.stringify({ email, password }),
      });
      Router.push({ pathname: "/login", query: { isNewUser: true } });
    } catch (error) {
      setStatus(error);
    }
  };

  const handleFormValidatation = ({ email }) => {
    const errors = {};

    if (!email) {
      errors.email = "Required.";
    }

    if (/\s/.test(email)) {
      errors.email = "Your email cannot contain spaces.";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }
      validate={handleFormValidatation}>
      {({ dirty, isSubmitting, isValid, status }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              name="password"
              type="password"
              minLength="4"
              maxLength="50"
            />
          </div>
          <ButtonSubmit
            isSubmitting={isSubmitting}
            isValid={isValid}
            formHasChanged={dirty}>
            Sign up
          </ButtonSubmit>
          <Notification role="alert">
            {status && <ServerErrorMessage error={status.error} />}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
