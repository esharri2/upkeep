//Libs

//Components
import AssetsForm from "../../components/forms/AssetsForm";
import Back from "../../components/Back";
import PrivateLayout from "../../components/PrivateLayout";

//Utils

export default function Assets() {
  return (
    <PrivateLayout narrow>
      <Back />
      <h1>Manage your assets</h1>
      <AssetsForm />
    </PrivateLayout>
  );
}
