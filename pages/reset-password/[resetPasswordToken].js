// Libs
import { useRouter } from "next/router";

// Components
import PasswordResetForm from "../../components/PasswordResetForm";

export default function ResetPassword() {
  const router = useRouter();
  const { resetPasswordToken } = router.query;

  return (
    <>
      <h1>Reset your password</h1>
      <PasswordResetForm resetPasswordToken={resetPasswordToken} />
    </>
  );
}
