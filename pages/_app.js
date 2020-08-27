import "../styles/global.css";

// Libs
import dynamic from "next/dynamic";

// Utils
import { UserProvider } from "../context/UserContext";

const AutoLogin = dynamic(() => import("../components/AutoLogin"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <AutoLogin />
      <Component {...pageProps} />
    </UserProvider>
  );
}
