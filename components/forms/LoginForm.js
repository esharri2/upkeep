// Libs
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";

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
          router.push("/setup");
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => setStatus({ type: "error", message: error }));
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
        </Form>
      )}
    </Formik>
  );
}
