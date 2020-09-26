// Components
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import Layout from "../components/Layout";

export default function RequestPasswordReset() {
  return (
    <Layout>
      <h1>Request a password reset</h1>
      <ForgotPasswordForm />
    </Layout>
  );
}
