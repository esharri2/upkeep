//Components
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";

export default function PrivateLayout({ children, narrow }) {
  return (
    <PrivateRoute>
      <Layout narrow={narrow}>{children}</Layout>
    </PrivateRoute>
  );
}
