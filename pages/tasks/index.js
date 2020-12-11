// Libs
import { Formik, Form } from "formik";
import useSWR from "swr";

// Components
import Field from "../../components/Field";
import PrivateLayout from "../../components/PrivateLayout";
import TaskCard from "../../components/TaskCard";

//Utils
import { getTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Tasks() {
  const { token } = useUser();
  const { data, error } = useSWR([`/api/tasks`, token], getTasks);

  const assets = data?.assets || [];

  // Flatten tasks into a single array
  const renderTasksByDate = (assets) => {
    const tasks = [].concat(...assets.map((asset) => asset.tasks));
    const sortedTasks = tasks.sort((a, b) => {
      if (a.dueIn > b.dueIn) {
        return 1;
      }
      return -1;
    });
    // sort by duen
    return tasks.map((task) => <TaskCard key={task._id} task={task} />);
  };

  // TODO component?
  const renderTasksByAsset = (assets) => {
    return assets.map((asset) =>
      asset.tasks.map((task) => <TaskCard key={task._id} task={task} />)
    );
  };

  return (
    <PrivateLayout narrow>
      <h1>Tasks</h1>
      {error && <div>Failed to load.</div>}
      {!data && <div>Loading...</div>}
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
                {values.sort === "date" && renderTasksByDate(assets)}
                {values.sort === "asset" && renderTasksByAsset(assets)}
              </>
            );
          }}
        </Formik>
      )}
    </PrivateLayout>
  );
}
