import { getToken, postLogin } from "./fetchers";
import Router from "next/router";

export default async function login(
  emailInput,
  passwordInput,
  setUserCallback
) {
  const { accessToken, email, homeId } = await postLogin(null, {
    body: JSON.stringify({ email: emailInput, password: passwordInput }),
  });
  if (!accessToken) throw new Error();
  window.localStorage.setItem("returningUser", true);
  setUserCallback({ email, homeId, token: accessToken });
  setTokenRefreshTimer(setUserCallback);
  return;
}

const setTokenRefreshTimer = (setUserCallback) => {
  setInterval(async function () {
    console.log("refresh time!");
    getToken()
      .then(({ email, accessToken }) => {
        if (accessToken) {
          setUserCallback({
            email,
            token: accessToken,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Sorry to interrupt, but we need you to log in again.");
        Router.push("/login");
      });
  }, 0.9 * 60 * 1000);
};
