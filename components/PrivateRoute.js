// Components
import Layout from "./Layout";
import Link from "./Link";

// Utils
import useUser from "../hooks/useUser";

export default function PrivateRoute(props) {
  const { token } = useUser();

  if (!token) {
    return (
      <Layout>
        <p>You are not authorized to see this page.</p>
        <Link href="/">Go home</Link>
      </Layout>
    );
  } else {
    // Render props
    return props.children;
  }
}
