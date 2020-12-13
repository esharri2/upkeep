import React, { createContext, useEffect, useRef, useState } from "react";

const StatusContext = createContext();

const StatusProvider = (props) => {
  const [status, setStatusValue] = useState([]);

  const setStatus = (object) => {
    // Handle error objects passed from server
    if (object.message && object.message.hasOwnProperty("error")) {
      object.message = object.message.error;
    }
    object.time = new Date().getTime();
    setStatusValue([object, ...status]);
  };

  // removeStatus is getting called via setTimeout, creating a closure.
  // We can use this ref instead of 'status' state to get a fresh value.
  const refStatus = useRef(status);
  useEffect(() => {
    refStatus.current = status;
  }, [status]);

  const removeStatus = (timestamp) => {
    const statusClone = [...refStatus.current];
    const removeIndex = statusClone.map((item) => item.time).indexOf(timestamp);
    statusClone.splice(removeIndex, 1);
    setStatusValue(statusClone);
  };

  const value = { status, setStatus, removeStatus };

  return (
    <StatusContext.Provider value={value}>
      {props.children}
    </StatusContext.Provider>
  );
};

export default StatusContext;
export { StatusProvider };
