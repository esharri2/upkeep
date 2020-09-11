// Libs
import { Formik, Field, Form } from "formik";
import useSWR from "swr";
import { useRouter } from "next/router";

// Components
import Notification from "./Notification";
import ServerErrorMessage from "./ServerErrorMessage";

// Utils
import { getAssets, postAssets } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function AssetsForm() {
  const router = useRouter();
  const { token } = useUser();
  const { data, error } = useSWR(["/api/assets", token], getAssets);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleSubmit = async (values, setStatus) => {
    debugger;
    postAssets(token, {
      body: JSON.stringify({ assetIds: values.checked }),
    })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => setStatus(error));
  };

  const { assets = [] } = data;

  return (
    <Formik
      initialValues={{
        checked: assets.map((asset) => (asset.owned ? asset._id : null)),
      }}
      onSubmit={async (values, { setStatus }) =>
        handleSubmit(values, setStatus)
      }>
      {({ dirty, isSubmitting, status, values }) => {
        return (
          <Form>
            <div role="group" aria-labelledby="checkbox-group">
              {assets.map(({ _id, name, owned }) => (
                <label key={_id}>
                  <Field name="checked" type="checkbox" value={"" + _id} />
                  {name}
                  {_id}
                </label>
              ))}
            </div>

            <button disabled={isSubmitting || !dirty} type="submit">
              Save
            </button>
            <Notification>
              {status && <ServerErrorMessage error={status.error} />}
            </Notification>
          </Form>
        );
      }}
    </Formik>
  );
}
