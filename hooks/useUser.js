// import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function useUser() {
  const { user, setUser } = useContext(UserContext);
  // Just spreading this so it's easier to work with...
  const { email, token, homeId } = user;
  return { email, token, homeId, setUser };
}
