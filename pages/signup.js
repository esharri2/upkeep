// Components
import Layout from "../components/Layout";
import SignUpForm from "../components/forms/SignUpForm";

export default function Signup() {
  return (
    <Layout narrow>
      <h1>Create an account</h1>
      <SignUpForm />
    </Layout>
  );
}
