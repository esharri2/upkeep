//Libs
import { useRouter } from "next/router";

//Components
import Back from "../../../../components/Back";
import InstanceForm from "../../../../components/forms/InstanceForm";
import PrivateLayout from "../../../../components/PrivateLayout";

//Utils
import theme from "../../../../styles/theme";

export default function AddInstance() {
  const router = useRouter();
  const { asset, task } = router?.query;
  return (
    <PrivateLayout narrow>
      <Back />
      <h1>Update task history</h1>
      {asset && task && (
        <>
          <span className="asset">{asset}: </span>
          <span className="task"> {task}</span>
        </>
      )}
      <p>
        Note: If you have never completed this task, enter the date purchased or
        acquired.
      </p>
      <InstanceForm />
      <style jsx>{`
        .asset {
          color: ${theme.colors.accent1};
        }

        .task {
          font-weight: 700;
          margin-bottom: ${theme.spacing.m};
        }

        span {
          font-size: ${theme.fontSizes.l};
        }
      `}</style>
    </PrivateLayout>
  );
}
