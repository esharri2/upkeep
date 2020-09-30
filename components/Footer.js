// Libs
import css from "styled-jsx/css";

// Components
import BackToTop from "../components/BackToTop";
import Link from "../components/Link";

// Utils
import theme from "../styles/theme";

const { className, styles } = css.resolve`
  a {
    color: ${theme.colors.light};
    text-decoration: none;
    text-transform: uppercase;
  }
`;

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link className={className} href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className={className} href="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className={className} href="/terms">
            Terms of use
          </Link>
        </li>
      </ul>
      <BackToTop />
      <div>
        <div className="logo">Upkeep</div>
        <div className="copyright">©2020 Upkeep. All rights reserved.</div>
      </div>
      <style jsx>{`
        footer {
          background-color: ${theme.colors.accent1};
          color: ${theme.colors.light};
          min-height: 250px;
          padding: ${theme.spacing.l};
          position: relative;
        }

        ul {
          margin: 0;
          padding: 0;
        }

        li {
          list-style-type: none;
        }

        footer > div {
          margin-top: ${theme.spacing.l};
          border-top: solid 1px ${theme.colors.middle};
          padding: ${theme.spacing.l} 0;
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
        }

        .logo {
          font-weight: 600;
          font-size: ${theme.fontSizes.l};
          padding-right: ${theme.spacing.m};
        }

        .copyright {
          color: ${theme.colors.middle};
        }
      `}</style>
      {styles}
    </footer>
  );
}
