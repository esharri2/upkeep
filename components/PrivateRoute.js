import Link from "next/link";
import useUser from "../hooks/useUser";

export default function PrivateRoute(props) {
  const { token } = useUser();

  if (!token) {
    return (
      <>
        <p>YOU are not authorized.</p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </>
    );
  } else {
    // Render props
    return props.children;
  }
}
