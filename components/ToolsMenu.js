import {
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";

// Components
import Icon from "./Icon";
import Menu from "./Menu";
import AppsSVG from "../media/icons/view-apps.svg";
import GraphlineSVG from "../media/icons/graph-line.svg";
import HomeSVG from "../media/icons/home.svg";
import TodoSVG from "../media/icons/to-do.svg";

// Utils
import theme from "../styles/theme";

export default function UserMenu() {
  const styleProps = { width: "1rem", marginRight: "1rem" };

  return (
    <Menu>
      <MenuButton className="menu-button" aria-label="User menu">
        <Icon>
          <AppsSVG />
        </Icon>
      </MenuButton>
      <MenuList>
        <MenuLink href="/dashboard">
          <Icon {...styleProps}>
            <GraphlineSVG />
          </Icon>{" "}
          Dashboard
        </MenuLink>
        <MenuLink href="/assets">
          <Icon {...styleProps}>
            <HomeSVG />
          </Icon>
          Manage assets
        </MenuLink>
        <MenuLink href="/tasks">
          <Icon {...styleProps}>
            <TodoSVG />
          </Icon>
          Manage tasks
        </MenuLink>
      </MenuList>
    </Menu>
  );
}
