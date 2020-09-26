// Components
import Link from "../../components/Link";
import PrivateLayout from "../../components/PrivateLayout";

export default function Settings() {
  return (
    <PrivateLayout>
      <div>
        <h1>Settings</h1>
        <ul>
          <li>
            <Link href="/settings/change-password">
              <a>Change password</a>
            </Link>
          </li>
          <li>
            <Link href="/settings/delete-account">
              <a>Delete account</a>
            </Link>
          </li>
        </ul>
      </div>
    </PrivateLayout>
  );
}
