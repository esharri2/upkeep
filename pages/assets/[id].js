//Libs
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import useSWR from "swr";

//Components
import Notification from "../../components/Notification";
import PrivateLayout from "../../components/PrivateLayout";
import ServerErrorMessage from "../../components/ServerErrorMessage";

//Utils
import { getAssets, postAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Asset(props) {
  const { token } = useUser();

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR([`/api/assets/${id}`, token], getAssets);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //TODO TEST DATE STUFF!

  const handleSubmit = async (values, setStatus) => {
    postAssets(
      token,
      {
        body: JSON.stringify(values),
      },
      id
    )
      .then(() => {
        alert("yaya");
        //mutate? maybe not ...
      })
      .catch((error) => setStatus(error));
  };

  const {
    name,
    manufacturer,
    model,
    modelNumber,
    serialNumber,
    datePurchased,
    notes,
    tasks,
  } = data.asset;

  return (
    <PrivateLayout>
      <h1>{name}</h1>
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
    </PrivateLayout>
  );
}
