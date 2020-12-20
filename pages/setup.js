import AssetsBulkForm from "../components/forms/AssetsBulkForm";
import PrivateLayout from "../components/PrivateLayout";

import { useRouter } from "next/router";

export default function Setup() {
  const router = useRouter();
  const isNewUser = router.query?.isNewUser;

  return (
    <PrivateLayout narrow>
      <h1>Select your home's assets</h1>
      <AssetsBulkForm isNewUser={isNewUser} />
    </PrivateLayout>
  );
}
