// Libs
import { Formik, Field, Form } from "formik";
import { mutate } from "swr";

// Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

// Utils
import { postTodos } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function TodoForm() {
  const { token } = useUser();

  const handleSubmit = async (values, setStatus, setFieldValue) => {
    const { todo } = values;
    postTodos(token, {
      body: JSON.stringify({ todo }),
    })
      .then(() => {
        mutate(["/api/todos", token]);
        setFieldValue("todo", "");
      })
      .catch((error) => setStatus(error));
  };

  return (
    <Formik
      initialValues={{ todo: "" }}
      onSubmit={async (values, { setStatus, setFieldValue }) =>
        handleSubmit(values, setStatus, setFieldValue)
      }>
      {({ dirty, isSubmitting, status }) => (
        <Form>
          <Field name="todo" type="text" />
          <button disabled={isSubmitting || !dirty} type="submit">
            Save
          </button>
          <Notification>
            {status && <ServerErrorMessage error={status.error} />}
          </Notification>
        </Form>
      )}
    </Formik>
  );
}
