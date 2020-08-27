import Router from "next/router";

export default function logout(setUser, redirectHome) {
  localStorage.removeItem("returningUser");
  setUser({});
  if (redirectHome) {
    Router.push("/");
  }
}
