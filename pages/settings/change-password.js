// Components
import PasswordChangeForm from "../../components/forms/PasswordChangeForm";
import PrivateLayout from "../../components/PrivateLayout";

export default function ChangePassword() {
  return (
    <PrivateLayout narrow>
      <h1>Change your password</h1>
      <PasswordChangeForm />
    </PrivateLayout>
  );
}
