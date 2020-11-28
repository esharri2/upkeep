import React, { createContext, useState } from "react";

// TODO change default state?
const defaultState = {
  email: null,
  token: null,
  homeId: null,
};

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUserValue] = useState(defaultState);

  const setUser = (object) => {
    setUserValue(object);
  };

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
