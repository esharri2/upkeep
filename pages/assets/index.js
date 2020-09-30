//Libs

//Components
import AssetsForm from "../../components/forms/AssetsForm";
import PrivateLayout from "../../components/PrivateLayout";

//Utils

export default function Assets() {
  return (
    <PrivateLayout narrow>
      <h1>Manage your assets</h1>
      <AssetsForm />
    </PrivateLayout>
  );
}
