// Libs
import { useState } from "react";

// Components
import Notification from "./Notification";

// Utils
import login from "../utils/client/login";
import useUser from "../hooks/useUser";

export default function AutoLogin() {
  const { token, setUser } = useUser();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [failed, setFailed] = useState(false);

  const isReturningUserWithoutToken =
    JSON.parse(window.localStorage.getItem("returningUser")) && !token;

  if (isReturningUserWithoutToken && !isLoggingIn && !failed) {
    setIsLoggingIn(true);
    login(null, null, setUser)
      .catch((error) => {
        setFailed(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  }
  return (
    <Notification role="status">
      {isLoggingIn ? "Logging you in!" : null}
    </Notification>
  );
}
