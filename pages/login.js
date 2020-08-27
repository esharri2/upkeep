// Libs
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import LoginForm from "../components/LoginForm";

export default function Login(props) {
  const router = useRouter();
  const isNewUser = router.query?.isNewUser;

  return (
    <div>
      <h1>
        {isNewUser
          ? "Thanks for creating an account! Please log in."
          : "Log in to your account."}
      </h1>
      <LoginForm />

      <Link href="/forgot-password">
        <a>I forgot my password.</a>
      </Link>
    </div>
  );
}
