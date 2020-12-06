import {
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";

// Components
import GearSVG from "../media/icons/gear.svg";
import Icon from "./Icon";
import Link from "./Link";
import Logout from "./Logout";
import Menu from "./Menu";
import UserSVG from "../media/icons/user.svg";

// Utils
import theme from "../styles/theme";

export default function UserMenu({ userName }) {
  const iconWidth = { width: "1rem" };

  return (
    <Menu>
      <MenuButton className="menu-button" aria-label="User menu">
        <Icon>
          <UserSVG />
        </Icon>
      </MenuButton>
      <MenuList>
        <div className="menu-header">
          Hello! <div className="user-name">{userName}</div>
        </div>
        <div className="menu-item">
          <Link href="/settings">
            <Icon {...iconWidth}>
              <GearSVG />
            </Icon>
            Manage account
          </Link>
        </div>
        <div className="menu-item">
          <Logout />
        </div>
      </MenuList>
    </Menu>
  );
}
