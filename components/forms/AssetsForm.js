//Libs
import { Formik, Form, Field as FormikField } from "formik";
import useSWR from "swr";

//Components
import AssetCard from "../AssetCard";
import CheckboxInput from "../CheckboxInput";
import Field from "../Field";
import Icon from "../Icon";
import SearchSVG from "../../media/icons/search.svg";

//Utils
import { getAssets } from "../../utils/client/fetchers";
import theme from "../../styles/theme";
import useUser from "../../hooks/useUser";

export default function AssetForm() {
  const { token } = useUser();
  const { data, error } = useSWR(["/api/assets", token], getAssets);

  return (
    <>
      {error && <div>failed to load</div>}
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
                  <div className="search">
                    <Icon>
                      <SearchSVG />
                    </Icon>
                    <label htmlFor="search">Search:</label>
                    <Field noMargin name="search" type="text" />
                  </div>
                  <CheckboxInput name="owned" type="checkbox">
                    My assets
                  </CheckboxInput>
                  <CheckboxInput name="unowned" type="checkbox">
                    Unowned assets
                  </CheckboxInput>
                </Form>
                <div className="cards">
                  {data &&
                    (assetCards.some((item) => item !== null)
                      ? assetCards
                      : "Nothing matches these filters.")}
                </div>
              </>
            );
          }}
        </Formik>
      )}
      <style jsx>{`
        .search {
          display: flex;
          align-items: center;
          padding: ${theme.spacing.m} 0;
        }

        .search label {
          padding-right: ${theme.spacing.s};
        }
      `}</style>
    </>
  );
}
