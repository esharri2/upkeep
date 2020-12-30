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
    <Menu
      button={
        <Icon marginRight="0">
          <AppsSVG />
        </Icon>
      }>
      <ul>
        <li>
          <Link href="/dashboard">
            <Icon {...styleProps}>
              <GraphlineSVG />
            </Icon>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/assets">
            <Icon {...styleProps}>
              <HomeSVG />
            </Icon>
            Manage assets
          </Link>
        </li>
        <li>
          <Link href="/tasks">
            <Icon {...styleProps}>
              <TodoSVG />
            </Icon>
            Manage tasks
          </Link>
        </li>
        <li>
          <ExportData styleProps={styleProps} />
        </li>
      </ul>
    </Menu>
  );
}
