//Libs
import { Formik, Form } from "formik";

//Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";
import StatusBanner from "../StatusBanner";

//Utils
import { postTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function TaskForm({ task }) {
  const { token } = useUser();
  const [type, message, setStatus] = useStatus();

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
        setStatus(true);
      })
      .catch((error) => setStatus(false, error));
  };

  return (
    <Formik
      initialValues={{
        frequency,
        notes,
      }}
      onSubmit={async (values) => handleSubmit(values)}>
      {({ dirty, isSubmitting, values }) => {
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
            <StatusBanner type={type} message={message} />
          </Form>
        );
      }}
    </Formik>
  );
}
