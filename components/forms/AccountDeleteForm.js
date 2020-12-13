// Libs
import { Formik, Form } from "formik";

// Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";

// Utils
import { deleteAccount } from "../../utils/client/fetchers";
import logout from "../../utils/client/logout";
import useStatus from "../../hooks/useStatus";
import useUser from "../../hooks/useUser";

export default function DeleteAccount() {
  const { token, setUser } = useUser();
  const { setStatus } = useStatus();

  const handleSubmit = (values) =>
    deleteAccount(token, values.email)
      .then(() => {
        setStatus({ type: "success", message: "Your account was deleted." });
        logout(setUser, true);
      })
      .catch((error) => {
        setStatus({ type: "error", message: "error" });
      });

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setFieldValue }) =>
        handleSubmit(values, setFieldValue)
      }>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="email">Please type your email:</label>
          <Field name="email" type="email" />
          <ButtonSubmit isSubmitting={isSubmitting}>
            Delete my account
          </ButtonSubmit>
        </Form>
      )}
    </Formik>
  );
}
