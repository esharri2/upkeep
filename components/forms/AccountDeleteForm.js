// Libs
import { Formik, Form } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import Link from "../Link";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

// Utils
import { deleteAccount } from "../../utils/client/fetchers";
import logout from "../../utils/client/logout";
import useUser from "../../hooks/useUser";

export default function DeleteAccount() {
  const { token, setUser } = useUser();

  const handleSubmit = (values, setStatus) =>
    deleteAccount(token, values.email)
      .then(() => {
        setStatus({ success: true });
        logout(setUser, true);
      })
      .catch((error) => {
        setStatus(error);
      });

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setStatus, setFieldValue }) =>
        handleSubmit(values, setStatus, setFieldValue)
      }>
      {({ isSubmitting, status }) => (
        <Form>
          <label htmlFor="email">Please type your email:</label>
          <Field name="email" type="email" />
          <ButtonSubmit isSubmitting={isSubmitting}>
            Delete my account
          </ButtonSubmit>
          <Notification>
            {status?.error && <ServerErrorMessage error={status.error} />}
            {status?.success && (
              <p>
                Your account has been completely deleted.
                <Link href="/">
                  <a>Return home.</a>
                </Link>
              </p>
            )}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
