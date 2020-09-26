//Components
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";

export default function PrivateLayout(props) {
  return (
    <PrivateRoute>
      <Layout>{props.children}</Layout>
    </PrivateRoute>
  );
}
