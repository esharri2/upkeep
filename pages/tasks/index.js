// Libs
import { Formik, Form, Field } from "formik";
import useSWR from "swr";

// Components
import Link from "../../components/Link";
import PrivateLayout from "../../components/PrivateLayout";

//Utils
import { getTasks } from "../../utils/client/fetchers";
import useUser from "../../hooks/useUser";

export default function Tasks() {
  const { token } = useUser();
  const { data, error } = useSWR([`/api/tasks`, token], getTasks);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const assets = data.assets || [];
  // TODO may get tasks in order?

  // TODO component?
  const renderTasksByDate = (assets) => {
    const tasks = [].concat(
      ...assets.map((asset) => (!asset.owned ? [] : asset.tasks))
    );

    // TODO need to get instance stuff set up to do this function

    // cosnt sortedTasks = tasks.sort(task=>{
    //     const lastInstance = instances.sort(instance)

    // })

    // get most recent instance date
    // compare against interval
    // get daysDueIn
    // sort by that

    // const sortedTasks =
    return tasks.map((task) => (
      <p>
        {task.name}{" "}
        <Link href={`/tasks/${task.id}`}>
          <a>Edit</a>
        </Link>
      </p>
    ));
  };

  // TODO component?
  const renderTasksByAsset = (assets) => {
    return assets.map((asset) => {
      return (
        <div>
          <h2>{asset.name}</h2>
          {asset.tasks.map((task) => (
            <p>
              {task.name}{" "}
              <Link href={`/tasks/${task.id}`}>
                <a>Edit</a>
              </Link>
            </p>
          ))}
        </div>
      );
    });
  };

  return (
    <PrivateLayout>
      <h1>Tasks</h1>
      <Formik initialValues={{ sort: "date" }}>
        {({ values }) => {
          return (
            <>
              <Form>
                <label for="sort-tasks">Sort by:</label>
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
    </PrivateLayout>
  );
}
