//Libs
import { Formik, Form, Field } from "formik";
import useSWR from "swr";

//Libs
import { useRouter } from "next/router";

//Components
import AssetForm from "../../components/forms/AssetForm";
import PrivateLayout from "../../components/PrivateLayout";

//Utils
import { getAssets, postAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;

  const { token } = useUser();

  const { data, error } = useSWR([`/api/assets/${id}`, token], getAssets);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <PrivateLayout>
      <h1>{data.asset.name}</h1>
      <AssetForm asset={data.asset} />
    </PrivateLayout>
  );
}
