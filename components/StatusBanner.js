import { useEffect, useState } from "react";
import theme from "../styles/theme";

export default function StatusBanner({ children, type }) {
  let message = null;
  const [hidden, isHidden] = useState(false);
  // Render the status body after mount so screen reader will announce it.
  useEffect(() => {
    message = <div className="container">{children}</div>;
    // set timer here too?
  }, []);
  //todo needs to remove itself after a bit;
  //slide down?
  // use effect to render the children
  return (
    <>
      {hidden ? null : (
        <div className={`outer ${type}`} role="status">
          {message}
          <style jsx>{`
            .outer {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 100px;
            }
          `}</style>
          <style jsx>{`
            .success {
              background-color: green;
            }

            .failure {
              background-color: red;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
