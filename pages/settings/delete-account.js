// Components
import AccountDeleteForm from "../../components/AccountDeleteForm";
import PrivateLayout from "../../components/PrivateLayout";

export default function DeleteAccount() {
  return (
    <PrivateLayout>
      <h1>Delete your account</h1>
      <AccountDeleteForm />
    </PrivateLayout>
  );
}
