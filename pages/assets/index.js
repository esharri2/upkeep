//Libs
import { Formik, Form, Field } from "formik";
import useSWR from "swr";

//Components
import AssetCard from "../../components/AssetCard";
import PrivateLayout from "../../components/PrivateLayout";

//Utils
import { getAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Assets() {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/assets", token], getAssets);

  // mutate("/api/user", { ...data, name: newName });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <PrivateLayout>
      <h1>Assets</h1>
      {error && <div>failed to load</div>}
      {!data && <div>loading...</div>}
      {data && (
        <Formik
          initialValues={{
            owned: true,
            unowned: true,
            search: "",
          }}
          onSubmit={async (values, { setStatus }) =>
            handleSubmit(values, setStatus)
          }>
          {({ dirty, isSubmitting, status, values }) => {
            return (
              <>
                <Form>
                  <div>
                    <label htmlFor="email">Search:</label>
                    <Field name="search" type="text" />
                  </div>
                  <label>
                    <Field name="owned" type="checkbox" />
                    Show owned
                  </label>
                  <label>
                    <Field name="unowned" type="checkbox" />
                    Show unowned
                  </label>
                </Form>
                {data &&
                  data.assets.map((asset) => {
                    const { owned, name } = asset;
                    if (
                      name
                        .toLowerCase()
                        .includes(values.search.toLowerCase()) &&
                      ((values.owned && owned) || (values.unowned && !owned))
                    ) {
                      return <AssetCard asset={asset} />;
                    } else {
                      return null;
                    }
                  })}
              </>
            );
          }}
        </Formik>
      )}
    </PrivateLayout>
  );
}
