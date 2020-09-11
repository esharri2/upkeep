// Libs
import Link from "next/link";

// Components
import Logout from "./Logout";

// Utils
import useUser from "../hooks/useUser";

export default function Header() {
  const { email, homeId } = useUser();
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      {email && (
        <>
          <span>
            {" "}
            - You are logged in as {email}. Default home is {homeId} -{" "}
          </span>
          <Link href="/settings">
            <a>Settings</a>
          </Link>
          {` - `}
          <Logout />
        </>
      )}
    </header>
  );
}
