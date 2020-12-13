import {
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";

// Components
import ExportData from "./ExportData";
import Icon from "./Icon";
import Link from "./Link";
import Menu from "./Menu";
import AppsSVG from "../media/icons/view-apps.svg";
import GraphlineSVG from "../media/icons/graph-line.svg";
import HomeSVG from "../media/icons/home.svg";
import TodoSVG from "../media/icons/to-do.svg";

export default function ToolsMenu() {
  const styleProps = { width: "1rem", marginRight: "1rem" };

  return (
    <Menu>
      <MenuButton className="menu-button" aria-label="User menu">
        <Icon>
          <AppsSVG />
        </Icon>
      </MenuButton>
      <MenuList>
        <div className="menu-item">
          <Link href="/dashboard">
            <Icon {...styleProps}>
              <GraphlineSVG />
            </Icon>{" "}
            Dashboard
          </Link>
        </div>
        <div className="menu-item">
          <Link href="/assets">
            <Icon {...styleProps}>
              <HomeSVG />
            </Icon>
            Manage assets
          </Link>
        </div>
        <div className="menu-item">
          <Link href="/tasks">
            <Icon {...styleProps}>
              <TodoSVG />
            </Icon>
            Manage tasks
          </Link>
        </div>
        <div className="menu-item">
          <ExportData styleProps={styleProps} />
        </div>
      </MenuList>
    </Menu>
  );
}
