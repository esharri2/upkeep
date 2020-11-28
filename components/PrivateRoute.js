// Components
import Link from "./Link";

// Utils
import useUser from "../hooks/useUser";

export default function PrivateRoute(props) {
  const { token } = useUser();

  if (!token) {
    return (
      <>
        <p>YOU are not authorized.</p>
        <Link href="/">Go home</Link>
      </>
    );
  } else {
    // Render props
    return props.children;
  }
}
