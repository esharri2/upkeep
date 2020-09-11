// Libs
import Link from "../components/Link";

// Components

// Utils
import useUser from "../hooks/useUser";

export default function Home() {
  const { email } = useUser();
  return (
    <div className="container">
      <main>
        <h1 className="title text-xl">
          Next.js + Mongoose + Auth Todo Example
        </h1>

        {email ? (
          <>
            <p>Hey! We logged you in automatically as {email}.</p>
            <Link href="/dashboard">Go to your dashboard.</Link>
          </>
        ) : (
          <ul>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
            <li>
              <Link href="/login">Log in with existing account</Link>
            </li>
          </ul>
        )}
      </main>
    </div>
  );
}
