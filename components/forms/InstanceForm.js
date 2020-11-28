// todo copy paste from task form update everyting!

//Libs
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

//Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

//Utils
import useUser from "../../hooks/useUser";
import { postInstances } from "../../utils/client/fetchers";

/**
 * Not set up for updating, jsut adding new instance.
 */

export default function InstanceForm() {
  const { token } = useUser();
  const router = useRouter();

  const { id: taskId } = router.query;

  const handleSubmit = async (values, setStatus) => {
    postInstances(
      token,
      {
        body: JSON.stringify(values),
      },
      taskId
    )
      .then(() => {
        router.push(`/tasks/${taskId}`);
      })
      .catch((error) => setStatus(error));
  };

  return (
    <Formik
      initialValues={{
        notes: "",
        date: new Date().toLocaleDateString("en-CA"),
      }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status, values }) => {
        return (
          <Form>
            <div>
              <label htmlFor="date">Date completed</label>
              <Field name="date" type="date" />
              <label htmlFor="notes">Notes</label>
              <Field
                placeholder="Add any notes about what you did."
                as="textarea"
                name="notes"
              />
            </div>
            <ButtonSubmit isSubmitting={isSubmitting}>Save</ButtonSubmit>
            <Notification role="alert">
              {status?.error && <ServerErrorMessage error={status.error} />}
            </Notification>
          </Form>
        );
      }}
    </Formik>
  );
}
