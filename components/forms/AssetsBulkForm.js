// Libs
import css from "styled-jsx/css";
import { Formik, Form } from "formik";
import useSWR from "swr";
import { useRouter } from "next/router";

// Components
import ButtonSubmit from "../ButtonSubmit";
import CheckboxInput from "../CheckboxInput";
import Notification from "../Notification";
import ServerErrorMessage from "../ServerErrorMessage";

// Utils
import { getAssets, postAssets } from "../../utils/client/fetchers";
import theme from "../../styles/theme";
import useUser from "../../hooks/useUser";

const { className, styles } = css.resolve`
  label:not(:first-of-type) {
    margin: 1rem 0 0 0 !important;
  }

  label:last-of-type {
    margin-bottom: 1rem !important;
  }
`;

export default function AssetsForm() {
  const router = useRouter();
  const { token } = useUser();
  const { data, error } = useSWR(["/api/assets", token], getAssets);

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

  const assets = data?.assets || [];
  console.log(assets);
  return (
    <>
      <p id="checkbox-group">
        Select the assets that you have in your home. You can always update
        these later.
      </p>
      {error && <p>failed to load</p>}
      {!data && <p>loading</p>}
      {data && (
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
                    <CheckboxInput
                      className={className}
                      name={name}
                      value={"" + _id}
                      type="checkbox">
                      {name}
                    </CheckboxInput>
                  ))}
                </div>
                <ButtonSubmit
                  text="Log in"
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                />
                <Notification>
                  {status && <ServerErrorMessage error={status.error} />}
                </Notification>
              </Form>
            );
          }}
        </Formik>
      )}
      {styles}
      <style jsx>{`
        [role="group"] {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
