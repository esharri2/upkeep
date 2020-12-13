// Libs
import { useRouter } from "next/router";

// Components
import Layout from "../../components/Layout";
import PasswordResetForm from "../../components/forms/PasswordResetForm";

export default function ResetPassword() {
  const router = useRouter();
  const { resetPasswordToken } = router.query;

  return (
    <Layout narrow>
      <h1>Reset your password</h1>
      <PasswordResetForm resetPasswordToken={resetPasswordToken} />
    </Layout>
  );
}
