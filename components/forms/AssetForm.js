//Libs
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { mutate } from "swr";

//Components
import Field from "../Field";
import ButtonSubmit from "../ButtonSubmit";

//Utils
import { postAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

export default function AssetForm({ asset }) {
  const { token } = useUser();
  const { setStatus } = useStatus();
  const router = useRouter();

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

  const handleSubmit = async (values) =>
    postAssets(
      token,
      {
        body: JSON.stringify(values),
      },
      _id
    )
      .then(() => {
        setStatus({ type: "success" });
        mutate([`/api/assets/${_id}`, token]);
        router.push("/assets");
      })
      .catch((error) => {
        setStatus({
          message: error,
          type: "error",
        });
      });

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
      onSubmit={async (values) => handleSubmit(values)}>
      {({ dirty, isSubmitting, values }) => {
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
          </Form>
        );
      }}
    </Formik>
  );
}
