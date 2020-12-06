import useUser from "../hooks/useUser";
import logout from "../utils/client/logout";

// Components
import Icon from "./Icon";
import ExitSVG from "../media/icons/exit.svg";

export default function Logout() {
  const { setUser } = useUser();

  const handleClick = () => {
    logout(setUser, true);
  };

  return (
    <button onClick={handleClick}>
      <Icon width="1rem">
        <ExitSVG />
      </Icon>
      Logout
    </button>
  );
}
