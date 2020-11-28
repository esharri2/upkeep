//Libs

//Components
import InstanceForm from "../../../../components/forms/InstanceForm";
import PrivateLayout from "../../../../components/PrivateLayout";

//Utils

export default function AddInstance() {
  return (
    <PrivateLayout narrow>
      <h1>Update task history</h1>
      <InstanceForm />
    </PrivateLayout>
  );
}
