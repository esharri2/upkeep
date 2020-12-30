// Libs
import { ErrorMessage, Formik, Form } from "formik";
import { useRouter } from "next/router";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import FormErrorMessage from "./FormErrorMessage";

// Utils
import login from "../../utils/client/login";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function LoginForm(props) {
  const { setUser } = useUser();
  const { setStatus } = useStatus();
  const router = useRouter();

  const handleSubmit = async (values) => {
    const { email, password } = values;

    login(email, password, setUser)
      .then(() => {
        if (props.isNewUser) {
          router.push({ pathname: "/setup", query: { isNewUser: true } });
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => setStatus({ type: "error", message: error }));
  };

  const handleFormValidatation = ({ email, password }) => {
    const errors = {};

    // if (!email) {
    //   errors.email = "Required.";
    // }

    // if (!/@/.test(email) || /\s/.test(email)) {
    //   errors.email = "This doesn't look like a valid email.";
    // }

    // if (!password) {
    //   errors.password = "You need to enter your password.";
    // }

    return errors;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }
      validate={handleFormValidatation}>
      {({ dirty, isSubmitting, isValid }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component={FormErrorMessage} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              autoComplete="current-password"
              name="password"
              type="password"
              maxLength="50"
              minLength="4"
            />
            <ErrorMessage name="password" component={FormErrorMessage} />
          </div>
          <ButtonSubmit isSubmitting={isSubmitting}>Log in</ButtonSubmit>
        </Form>
      )}
    </Formik>
  );
}
