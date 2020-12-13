// Components
import Link from "../../components/Link";
import PrivateLayout from "../../components/PrivateLayout";

// Utils
import theme from "../../styles/theme";

export default function Settings() {
  return (
    <PrivateLayout narrow>
      <div>
        <h1>Settings</h1>
        <ul>
          <li>
            <Link href="/settings/change-password">Change password</Link>
          </li>
          <li>
            <Link href="/settings/delete-account">Delete account</Link>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          ul {
            margin: 0;
            padding: 0;
          }
          li {
            text-decoration: underline;
            list-style-type: none;
            padding: ${theme.spacing.s} 0;
          }
        `}
      </style>
    </PrivateLayout>
  );
}
