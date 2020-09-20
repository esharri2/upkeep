//Libs
import { Formik, Form, Field } from "formik";
import useSWR from "swr";

//Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

//Utils
import { getAssets, postAssets } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function AssetForm({ asset }) {
  const { token } = useUser();

  const {
    _id,
    name,
    manufacturer,
    model,
    modelNumber,
    serialNumber,
    datePurchased,
    notes,
    tasks,
  } = asset;

  const handleSubmit = async (values, setStatus) => {
    postAssets(
      token,
      {
        body: JSON.stringify(values),
      },
      _id
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
        name,
        manufacturer,
        model,
        modelNumber,
        serialNumber,
        datePurchased,
        notes,
        tasks,
      }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status, values }) => {
        return (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
            </div>
            <div>
              <label htmlFor="name">Manufacturer</label>
              <Field name="manufacturer" type="text" />
            </div>
            <div>
              <label htmlFor="name">Model</label>
              <Field name="model" type="text" />
            </div>
            <div>
              <label htmlFor="name">Model number</label>
              <Field name="modelNumber" type="text" />
            </div>
            <div>
              <label htmlFor="name">Serial number</label>
              <Field name="serialNumber" type="text" />
            </div>
            <div>
              <label htmlFor="datePurchased">Date purchased</label>
              <Field name="datePurchased" type="date" />
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <Field as="textarea" name="notes" />
            </div>
            <button disabled={isSubmitting} type="submit">
              Save
            </button>
            <Notification role="alert">
              {status?.error && <ServerErrorMessage error={status.error} />}
            </Notification>
          </Form>
        );
      }}
    </Formik>
  );
}
