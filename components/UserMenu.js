import {
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";

// Components
import ExitSVG from "../media/icons/exit.svg";
import GearSVG from "../media/icons/gear.svg";
import Icon from "./Icon";
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
        <MenuLink href="/settings">
          <Icon {...iconWidth}>
            <GearSVG />
          </Icon>
          Manage account
        </MenuLink>
        <MenuItem>
          <Icon {...iconWidth}>
            <ExitSVG />
          </Icon>
          <Logout />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
