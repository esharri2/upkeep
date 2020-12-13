//Libs
import useSWR from "swr";
import { useRouter } from "next/router";

//Components
import AssetForm from "../../components/forms/AssetForm";
import Back from "../../components/Back";
import PrivateLayout from "../../components/PrivateLayout";
import SpinnerInPage from "../../components/SpinnerInPage";
import WarningFailedToLoad from "../../components/WarningFailedToLoad";

//Utils
import { getAssets } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;

  const { token } = useUser();

  const { data, error } = useSWR([`/api/assets/${id}`, token], getAssets);
  return (
    <PrivateLayout narrow>
      <Back href="/assets" label="list of assets" />
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <>
          <h1>{data.asset.name}</h1>
          <AssetForm asset={data.asset} />
        </>
      )}
    </PrivateLayout>
  );
}
