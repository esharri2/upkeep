//Libs
import { Formik, Form } from "formik";

//Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

//Utils
import { postTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function TaskForm({ task }) {
  const { token } = useUser();

  const { _id: taskId, assetId, frequency, notes } = task;

  const handleSubmit = async (values, setStatus) => {
    postTasks(
      token,
      {
        body: JSON.stringify(values),
      },
      taskId,
      assetId
    )
      .then(() => {
        alert("yaya");
        //mutate? maybe not ...
      })
      .catch((error) => setStatus(error));
  };

  return (
    <Formik
      initialValues={{
        frequency,
        notes,
      }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status, values }) => {
        return (
          <Form>
            <div>
              <label htmlFor="frequency">Frequency (in days)</label>
              <Field type="number" name="frequency" />
            </div>
            <div>
              <label htmlFor="notes">General notes</label>
              <Field
                placeholder="Add some notes to reference next time you do this task, i.e. youtube links"
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
