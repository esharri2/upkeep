// Libs
import css from "styled-jsx/css";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

// Components
import ButtonSubmit from "../ButtonSubmit";
import CheckboxInput from "../CheckboxInput";
import SpinnerInPage from "../SpinnerInPage";
import WarningFailedToLoad from "../WarningFailedToLoad";

// Utils
import { getAssets, postAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";
import useStatus from "../../hooks/useStatus";

const { className, styles } = css.resolve`
  label:not(:first-of-type) {
    margin: 1rem 0 0 0 !important;
  }

  label:last-of-type {
    margin-bottom: 1rem !important;
  }
`;

export default function AssetsForm(props) {
  const router = useRouter();
  const { token } = useUser();
  const { setStatus } = useStatus();
  const { data, error } = useSWR(["/api/assets", token], getAssets);

  const assets = data?.assets || [];

  const handleSubmit = async (values) => {
    postAssets(token, {
      body: JSON.stringify({ assetIds: values.checked }),
    })
      .then(() => {
        mutate([`/api/assets/`, token]);
        if (props.isNewUser) {
          router.push({ pathname: "/dashboard", query: { isNewUser: true } });
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => setStatus({ type: "error", message: error }));
  };

  return (
    <>
      <p id="checkbox-group">
        Select the assets you have in your home. You can always update these
        later.
      </p>
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <Formik
          enableReinitialize
          initialValues={{
            checked: assets.map((asset) => (asset.owned ? asset._id : false)),
          }}
          onSubmit={async (values) => handleSubmit(values)}>
          {({ dirty, isSubmitting, values }) => {
            return (
              <Form>
                <div role="group" aria-labelledby="checkbox-group">
                  {assets.map(({ _id, name, owned }) => (
                    <CheckboxInput
                      className={className}
                      name="checked"
                      value={_id}
                      key={_id}>
                      {name}
                    </CheckboxInput>
                  ))}
                </div>
                <ButtonSubmit
                  text="Log in"
                  isSubmitting={isSubmitting}
                  dirty={dirty}
                />
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
