// Libs
import Router from "next/router";
import { Formik, Form, ErrorMessage } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import CheckboxInput from "../CheckboxInput";
import Field from "../Field";
import FormErrorMessage from "../forms/FormErrorMessage";
import Link from "../Link";

// Utils
import { postSignUp } from "../../utils/client/fetchers";
import theme from "../../styles/theme";
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

  const handleFormValidatation = ({ email, password, terms }) => {
    const errors = {};

    if (!email) {
      errors.email = "Required.";
    }

    if (!password || password.length < 6) {
      errors.password =
        "You must include a password of more than 5 characters.";
    }

    if (/\s/.test(email)) {
      errors.email = "Your email cannot contain spaces.";
    }

    if (!/@/.test(email)) {
      errors.email = "Your email must contain an @ sign.";
    }

    if (!terms) {
      errors.terms = "You must agree to the terms of service.";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", terms: false }}
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
            <ErrorMessage name="password" component={FormErrorMessage} />
          </div>
          <div className="checkbox-container">
            <CheckboxInput name="terms" type="checkbox">
              I agree to the <Link href="/terms"> terms of service</Link>
            </CheckboxInput>
            <ErrorMessage name="terms" component={FormErrorMessage} />
          </div>
          <ButtonSubmit
            isSubmitting={isSubmitting}
            isValid={isValid}
            formHasChanged={dirty}>
            Sign up
          </ButtonSubmit>
          <style jsx>
            {`
              .checkbox-container {
                margin-bottom: ${theme.spacing.s};
              }
            `}
          </style>
        </Form>
      )}
    </Formik>
  );
}
