//Libs
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { mutate } from "swr";

//Components
import ButtonSubmit from "../ButtonSubmit";
import Field from "../Field";

//Utils
import useStatus from "../../hooks/useStatus";
import useUser from "../../hooks/useUser";
import { postInstances } from "../../utils/client/fetchers";

/**
 * Not set up for updating, jsut adding new instance.
 */

export default function InstanceForm() {
  const { token } = useUser();
  const { setStatus } = useStatus();
  const router = useRouter();

  const { id: taskId } = router.query;

  const handleSubmit = async (values) => {
    postInstances(
      token,
      {
        body: JSON.stringify(values),
      },
      taskId
    )
      .then(() => {
        setStatus({ type: "success" });
        mutate(["/api/dashboard", token]);
        router.back();
      })
      .catch((error) => {
        setStatus({ type: "error", message: error });
      });
  };

  return (
    <Formik
      initialValues={{
        note: "",
        date: new Date().toLocaleDateString("en-CA"),
      }}
      onSubmit={async (values) => handleSubmit(values)}>
      {({ dirty, isSubmitting, values }) => {
        return (
          <Form>
            <div>
              <label htmlFor="date">Date completed</label>
              <Field name="date" type="date" />
              <label htmlFor="note">Notes</label>
              <Field
                placeholder="Add any notes about what you did."
                as="textarea"
                name="note"
              />
            </div>
            <ButtonSubmit isSubmitting={isSubmitting}>Save</ButtonSubmit>
          </Form>
        );
      }}
    </Formik>
  );
}
