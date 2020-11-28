// Libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import Spinner from "./Spinner";

// Utils
import login from "../utils/client/login";
import useUser from "../hooks/useUser";
import theme from "../styles/theme";

export default function AutoLogin({ children }) {
  const { token, setUser } = useUser();
  const router = useRouter();
  const [hasAutoLoggedIn, setHasAutoLoggedIn] = useState(false);
  const [failed, setFailed] = useState(false);
  const isReturningUser = JSON.parse(
    window.localStorage.getItem("returningUser")
  );

  // Send user to login page if the auto login fails
  useEffect(() => {
    if (failed) router.push("/login");
  }, failed);

  // Do nothing (just pass children) if new visitor OR logged in
  if (!isReturningUser || token) {
    return children;
  } else {
    // Returning user who is not logged in; let's try to log in.
    login(null, null, setUser)
      .then(() => {
        setHasAutoLoggedIn(true);
      })
      .catch((error) => {
        setFailed(true);
        console.error(error);
      });
    return (
      <div role="status">
        <div className="loggingIn">
          <h1>Upkeep</h1>
          <p>Logging you in!</p>
          <Spinner width="50px" />
        </div>
        <style jsx>{`
          .loggingIn {
            position: fixed;
            font-family: ${theme.fontFamilies.body};
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            background-color: ${theme.colors.accent1};
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: ${theme.colors.light};
            fill: ${theme.colors.light};
          }

          h1 {
            font-size: ${theme.fontSizes.xl};
          }

          h1,
          p {
            margin: 0 0 ${theme.spacing.m};
          }

          p {
            font-size: ${theme.fontSizes.l};
          }
        `}</style>
      </div>
    );
  }
}
