import useUser from "../hooks/useUser";
import logout from "../utils/client/logout";

export default function Logout() {
  const { setUser } = useUser();

  const handleClick = () => {
    logout(setUser, true);
  };

  return <button onClick={handleClick}>Logout</button>;
}
