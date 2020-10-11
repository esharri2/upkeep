// Libs
import Link from "next/link";

// Components
import LinkAsButton from "./LinkAsButton";
import ToolsMenu from "./ToolsMenu";
import UserMenu from "./UserMenu";

// Utils
import theme from "../styles/theme";
import useUser from "../hooks/useUser";

export default function Header() {
  const { email, homeId } = useUser();
  return (
    <header>
      <Link href="/">
        <a className="logo">Upkeep</a>
      </Link>
      <div className="utilities">
        {email ? (
          <>
            <ToolsMenu /> <UserMenu userName={email} />
          </>
        ) : (
          <LinkAsButton href="/login">Log in</LinkAsButton>
        )}
      </div>

      <style jsx>{`
        header {
          border-bottom: solid 1px ${theme.colors.middle};
          padding: ${theme.spacing.m};
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: ${theme.sizes.headerHeight};
        }

        .logo {
          font-size: ${theme.fontSizes.xl};
          font-weight: 600;
          text-decoration: none;
          text-transform: uppercase;
          color: ${theme.colors.accent1};
        }
      `}</style>
    </header>
  );
}
