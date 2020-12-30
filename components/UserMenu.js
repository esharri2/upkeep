// Components
import GearSVG from "../media/icons/gear.svg";
import Icon from "./Icon";
import Link from "./Link";
import Logout from "./Logout";
import Menu from "./Menu";
import UserSVG from "../media/icons/user.svg";

import theme from "../styles/theme";

export default function UserMenu({ userName }) {
  const iconWidth = { width: "1rem" };

  return (
    <Menu
      button={
        <Icon>
          <UserSVG />
        </Icon>
      }>
      <ul>
        <li className="user-menu">
          Hello! <div className="user-name">{userName}</div>
        </li>
        <li>
          <Link href="/settings">
            <Icon {...iconWidth}>
              <GearSVG />
            </Icon>
            Manage account
          </Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
      <style jsx>{`
        .user-menu {
          display: block;
          text-align: center;
          padding: ${theme.spacing.l};
          border-bottom: solid 1px ${theme.colors.middle};
        }
      `}</style>
    </Menu>
  );
}
