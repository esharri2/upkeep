// Libs
import { Formik, Form } from "formik";
import useSWR from "swr";

// Components
import Back from "../../components/Back";
import WarningFailedToLoad from "../../components/WarningFailedToLoad";
import Field from "../../components/Field";
import IgnoredTaskCard from "../../components/IgnoredTaskCard";
import Link from "../../components/Link";
import PrivateLayout from "../../components/PrivateLayout";
import SpinnerInPage from "../../components/SpinnerInPage";
import TaskCard from "../../components/TaskCard";
import Warning from "../../components/Warning";

//Utils
import { getTasks } from "../../utils/client/fetchers";
import theme from "../../styles/theme";
import useUser from "../../hooks/useUser";

export default function Tasks() {
  const { token } = useUser();
  const { data, error } = useSWR([`/api/tasks`, token], getTasks);

  const assets = data?.assets || [];

  const renderTasksByDate = (assets) => {
    const tasks = [].concat(...assets.map((asset) => asset.tasks));
    const sortedTasks = tasks.sort((a, b) => {
      if (a.dueIn > b.dueIn) {
        return 1;
      }
      return -1;
    });
    return sortedTasks.map((task) => <TaskCard key={task._id} task={task} />);
  };

  const renderTasksByAsset = (assets) => {
    return assets.map((asset) =>
      asset.tasks.map((task) => <TaskCard key={task._id} task={task} />)
    );
  };

  const renderIgnoredTasks = () => {
    return assets.map((asset) =>
      asset.tasks.map((task) => {
        console.log(task.isIgnored);
        if (task.isIgnored) {
          return <IgnoredTaskCard key={task._id} task={task} />;
        }
        return null;
      })
    );
  };

  return (
    <PrivateLayout narrow>
      <Back />
      <h1>Tasks</h1>
      {error && <WarningFailedToLoad />}
      {!data && <SpinnerInPage />}
      {data && (
        <Formik initialValues={{ sort: "date" }}>
          {({ values }) => {
            return (
              <>
                <Form>
                  <label htmlFor="sort-tasks">Sort by:</label>
                  <Field as="select" id="sort-tasks" name="sort">
                    <option value="date">Date due</option>
                    <option value="asset">Asset</option>
                  </Field>
                </Form>
                {assets.length > 0 ? (
                  <>
                    {values.sort === "date" && renderTasksByDate(assets)}
                    {values.sort === "asset" && renderTasksByAsset(assets)}
                  </>
                ) : (
                  <Warning>
                    You don't have any assets, so you don't have any tasks!
                    <Link href="/setup">Click here to update your assets.</Link>
                  </Warning>
                )}
                <h1 className="ignore">Ignored tasks</h1>
                <p>
                  You've chosen to ignore these tasks. They won't show up in
                  your dashboard.
                </p>
                {true && renderIgnoredTasks(assets)}
              </>
            );
          }}
        </Formik>
      )}
      <style jsx>{`
        .ignore {
          margin-top: ${theme.spacing.l};
        }
      `}</style>
    </PrivateLayout>
  );
}
