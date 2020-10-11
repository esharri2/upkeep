//Libs
import { Formik, Form } from "formik";

//Components
import Field from "../Field";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";
import ButtonSubmit from "../ButtonSubmit";

//Utils
import { postAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

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

  const handleSubmit = async (values, setStatus) =>
    postAssets(
      token,
      {
        body: JSON.stringify(values),
      },
      _id
    )
      .then(() => {
        alert("done!");
        //mutate? maybe not ...
      })
      .catch((error) => setStatus(error));

  return (
    <Formik
      initialValues={{
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
            <label htmlFor="name">Manufacturer</label>
            <Field name="manufacturer" type="text" />
            <label htmlFor="name">Model</label>
            <Field name="model" type="text" />
            <label htmlFor="name">Model number</label>
            <Field name="modelNumber" type="text" />
            <label htmlFor="name">Serial number</label>
            <Field name="serialNumber" type="text" />
            <label htmlFor="datePurchased">Date purchased</label>
            <Field name="datePurchased" type="date" />
            <label htmlFor="notes">Notes</label>
            <Field as="textarea" name="notes" />
            <ButtonSubmit isSubmitting={isSubmitting} formHasChanged={dirty}>
              Save
            </ButtonSubmit>
            <Notification role="alert">
              {status?.error && <ServerErrorMessage error={status.error} />}
            </Notification>
          </Form>
        );
      }}
    </Formik>
  );
}
