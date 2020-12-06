// Libs
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

// Utils
import login from "../../utils/client/login";
import useUser from "../../hooks/useUser";

export default function LoginForm(props) {
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (values, setStatus) => {
    const { email, password } = values;

    login(email, password, setUser)
      .then(() => {
        if (props.isNewUser) {
          router.push("/setup");
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => setStatus(error));
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status = {} }) => (
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              autoComplete="current-password"
              name="password"
              type="password"
              maxLength="50"
            />
          </div>
          <ButtonSubmit isSubmitting={isSubmitting}>Log in</ButtonSubmit>
          <Notification role="alert">
            {status.error && <ServerErrorMessage error={status.error} />}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
