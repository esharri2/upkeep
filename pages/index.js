// Libs
import Link from "../components/Link";

// Components
import Layout from "../components/Layout";
import LinkAsButton from "../components/LinkAsButton";

// Utils
import useUser from "../hooks/useUser";

export default function Home() {
  const { email } = useUser();
  return (
    <Layout>
      <h1 className="title text-xl">Next.js + Mongoose + Auth Todo Example</h1>

      {email ? (
        <>
          <p>Hey! We logged you in automatically as {email}.</p>
          <Link href="/dashboard">Go to your dashboard.</Link>
        </>
      ) : (
        <>
          <LinkAsButton href="/signup">Sign up</LinkAsButton>
          <LinkAsButton href="/login">
            Log in with existing account
          </LinkAsButton>
        </>
      )}
    </Layout>
  );
}
