// Libs
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import Layout from "../components/Layout";
import LoginForm from "../components/forms/LoginForm";

// Utils
import theme from "../styles/theme";

export default function Login(props) {
  const router = useRouter();
  const isNewUser = router.query?.isNewUser;

  return (
    <Layout narrow>
      <h1>
        {isNewUser
          ? "Thanks for creating an account! Please log in."
          : "Log in to your home."}
      </h1>
      <LoginForm isNewUser={isNewUser} />
      <Link href="/forgot-password">
        <a>I forgot my password.</a>
      </Link>
      <style jsx>{`
        a {
          margin-top: ${theme.spacing.m};
          display: block;
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
}
