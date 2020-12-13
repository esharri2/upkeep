// Libs
import Router from "next/router";
import { Formik, Form, ErrorMessage } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import FormErrorMessage from "../forms/FormErrorMessage";

// Utils
import { postSignUp } from "../../utils/client/fetchers";
import useStatus from "../../hooks/useStatus";

export default function SignUpForm() {
  const { setStatus } = useStatus();

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      await postSignUp({
        body: JSON.stringify({ email, password }),
      });
      Router.push({ pathname: "/login", query: { isNewUser: true } });
    } catch (error) {
      setStatus({ type: "error", message: error });
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
      onSubmit={async (values) => handleSubmit(values)}
      validate={handleFormValidatation}>
      {({ dirty, isSubmitting, isValid, status }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component={FormErrorMessage} />
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
        </Form>
      )}
    </Formik>
  );
}
