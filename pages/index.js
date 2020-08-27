// Libs
import Link from "next/link";

// Utils
import useUser from "../hooks/useUser";

export default function Home() {
  const { email } = useUser();
  return (
    <div className="container">
      <main>
        <h1 className="title">Next.js + Mongoose + Auth Todo Example</h1>

        {email ? (
          <>
            <p>Hey! We logged you in automatically as {email}.</p>
            <Link href="/todos">
              <a>Go to your dashboard.</a>
            </Link>
          </>
        ) : (
          <ul>
            <li>
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>Log in with existing account</a>
              </Link>
            </li>
          </ul>
        )}
      </main>
    </div>
  );
}
