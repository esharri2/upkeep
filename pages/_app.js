import "../styles/index.css";

// Libs
import dynamic from "next/dynamic";

// Utils
import { StatusProvider } from "../context/StatusContext";
import { UserProvider } from "../context/UserContext";

const AutoLogin = dynamic(() => import("../components/AutoLogin"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StatusProvider>
        <AutoLogin>
          <Component {...pageProps} />
        </AutoLogin>
      </StatusProvider>
    </UserProvider>
  );
}
