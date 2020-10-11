import AssetsBulkForm from "../components/forms/AssetsBulkForm";
import PrivateLayout from "../components/PrivateLayout";

export default function Setup() {
  return (
    <PrivateLayout narrow>
      <h1>Setup</h1>
      <AssetsBulkForm />
    </PrivateLayout>
  );
}
