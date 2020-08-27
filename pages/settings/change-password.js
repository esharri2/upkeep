// Components
import PasswordChangeForm from "../../components/PasswordChangeForm";
import PrivateLayout from "../../components/PrivateLayout";

export default function ChangePassword() {
  return (
    <PrivateLayout>
      <h1>Change your password</h1>
      <PasswordChangeForm />
    </PrivateLayout>
  );
}
