//Libs
import { Formik, Form } from "formik";

//Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";

//Utils
import { postTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function TaskForm({ task }) {
  const { token } = useUser();
  const { setStatus } = useStatus();

  const { _id: taskId, assetId, frequency, notes } = task;

  const handleSubmit = async (values) => {
    postTasks(
      token,
      {
        body: JSON.stringify(values),
      },
      taskId,
      assetId
    )
      .then(() => {
        setStatus({ type: "success" });
      })
      .catch((error) => setStatus({ type: "error", message: error }));
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
          </Form>
        );
      }}
    </Formik>
  );
}
