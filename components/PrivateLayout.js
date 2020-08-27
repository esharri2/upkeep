//Components
import Footer from "./Footer";
import Header from "./Header";
import PrivateRoute from "./PrivateRoute";

export default function PrivateLayout(props) {
  return (
    <PrivateRoute>
      <Header />
      {props.children}
      <Footer />
    </PrivateRoute>
  );
}
