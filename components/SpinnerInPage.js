// TODO maybe add a timer to show -- "there may be a problem.."

import Spinner from "./Spinner";

import theme from "../styles/theme";

export default function SpinnerInPage() {
  return (
    <div>
      <p className="sr-only">Loading...</p>
      <Spinner />
      <style jsx>{`
        div {
          margin: ${theme.spacing.m} auto;
          fill: ${theme.colors.accent1};
          width: 100px;
        }
      `}</style>
    </div>
  );
}
