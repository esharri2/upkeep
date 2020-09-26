import useUser from "../hooks/useUser";
import logout from "../utils/client/logout";

// Components
import Button from "./Button";

export default function Logout() {
  const { setUser } = useUser();

  const handleClick = () => {
    logout(setUser, true);
  };

  return <button onClick={handleClick}>Logout</button>;
}
