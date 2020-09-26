//Libs

//Components
import AssetsForm from "../../components/forms/AssetsForm";
import PrivateLayout from "../../components/PrivateLayout";

//Utils

export default function Assets() {
  return (
    <PrivateLayout>
      <h1>Assets</h1>
      <AssetsForm />
    </PrivateLayout>
  );
}
