//Libs
import { Formik, Form } from "formik";
import { mutate } from "swr";

//Components
import ButtonSubmit from "../ButtonSubmit";
import CheckboxInput from "../CheckboxInput";
import Field from "../Field";

//Utils
import { postTasks } from "../../utils/client/fetchers";
import theme from "../../styles/theme";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function TaskForm({ task }) {
  const { token } = useUser();
  const { setStatus } = useStatus();

  const { _id: taskId, assetId, frequency, notes, isIgnored } = task;

  console.log(isIgnored);

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
        mutate([`/api/tasks/${taskId}`, token]);
        setStatus({ type: "success" });
      })
      .catch((error) => setStatus({ type: "error", message: error }));
  };

  return (
    <Formik
      initialValues={{
        frequency,
        notes,
        isIgnored,
      }}
      onSubmit={async (values) => handleSubmit(values)}>
      {({ dirty, isSubmitting, values }) => {
        return (
          <Form>
            <div>
              <label htmlFor="frequency">Frequency (in days)</label>
              <Field type="number" name="frequency" />
            </div>
            <div className="notes">
              <label htmlFor="notes">General notes</label>
              <Field
                placeholder="Add some notes to reference next time you do this task, i.e. youtube links"
                as="textarea"
                name="notes"
              />
            </div>
            <div className="checkbox-container">
              <CheckboxInput name="isIgnored" type="checkbox">
                Ignore (hide from your task list)
              </CheckboxInput>
            </div>
            <ButtonSubmit isSubmitting={isSubmitting}>Save</ButtonSubmit>
            <style jsx>
              {`
                .checkbox-container {
                  margin-bottom: ${theme.spacing.s};
                }
              `}
            </style>
          </Form>
        );
      }}
    </Formik>
  );
}
