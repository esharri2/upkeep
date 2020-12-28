import { Menu as ReachMenu } from "@reach/menu-button";

// Components

// Utils
import theme from "../styles/theme";

export default function UserMenu({ children }) {
  return (
    <ReachMenu>
      {children}
      <style jsx>{`
        :global(.menu-button) {
          background-color: transparent;
          border: none;
          fill: ${theme.colors.dark};
        }

        :global([data-reach-menu]) {
          display: block;
          position: absolute;
        }

        :global([data-reach-menu-list]) {
          background-color: ${theme.colors.light};
          box-shadow: ${theme.shadows.m};
          padding: 0;
        }

        :global([data-reach-menu-list]:focus) {
          outline: none;
        }

        :global([data-reach-menu-popover]) {
          border-radius: ${theme.borders.radius};
          min-width: 250px;
        }

        :global(.menu-item) {
          display: flex;
          align-items: center;
          border-bottom: solid 1px ${theme.colors.middle};
        }

        :global(.menu-item > a, .menu-item > button) {
          display: flex;
          padding: ${theme.spacing.m};

          height: 100%;
          width: 100%;
        }

        :global([data-reach-menu-item][data-selected], [data-selected] button) {
          background: ${theme.colors.accent1};
          color: ${theme.colors.light}!important;
          fill: ${theme.colors.light};
        }

        :global(.menu-header) {
          display: block;
          text-align: center;
          padding: ${theme.spacing.l};
          border-bottom: solid 1px ${theme.colors.middle};
        }

        :global(.user-name) {
          font-weight: 600;
        }

        :global(button, a) {
          text-decoration: none;
          color: ${theme.colors.dark};
          background-color: transparent;
          border: none;
          fill: ${theme.colors.dark};
        }

        :global(.icon) {
          margin-right: ${theme.spacing.s};
        }
      `}</style>
    </ReachMenu>
  );
}
