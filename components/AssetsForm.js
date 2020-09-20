//Libs
import { Formik, Form, Field } from "formik";
import useSWR from "swr";

//Components
import AssetCard from "./AssetCard";

//Utils
import { getAssets } from "../utils/client/fetchers";
import useUser from "../hooks/useUser";

export default function AssetForm() {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/assets", token], getAssets);

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <div>loading...</div>}
      {data && (
        <Formik
          initialValues={{
            owned: true,
            unowned: true,
            search: "",
          }}>
          {({ values }) => {
            const assetCards = data.assets.map((asset) => {
              const { owned, name } = asset;
              if (
                name.toLowerCase().includes(values.search.toLowerCase()) &&
                ((values.owned && owned) || (values.unowned && !owned))
              ) {
                return <AssetCard asset={asset} />;
              } else {
                return null;
              }
            });

            return (
              <>
                <Form>
                  <div>
                    <label htmlFor="search">Search:</label>
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
                  (assetCards.some((item) => item !== null)
                    ? assetCards
                    : "Nothing matches these filters.")}
              </>
            );
          }}
        </Formik>
      )}
    </>
  );
}
