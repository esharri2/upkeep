// Components
import Icon from "./Icon";
import ExportSVG from "../media/icons/export.svg";

// Utils
import useUser from "../hooks/useUser";
import useStatus from "../hooks/useStatus";
import { getExportData } from "../utils/client/fetchers";

export default function ExportData({ styleProps }) {
  const { token } = useUser();
  const { setStatus } = useStatus();
  const handleClick = (event) => {
    const fileType = "json"; //for now
    getExportData(token)
      .then((response) => {
        const dataString = JSON.stringify(response, null, 2);
        const fileName = fileType === "pdf" ? "export.pdf" : "export.json";
        const url = window.URL.createObjectURL(new Blob([dataString]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        setStatus({
          type: "success",
          message:
            "Your data has been downloaded. Check your Downloads folder if you don't see it.",
        });
      })
      .catch(() => {
        setStatus({
          type: "error",
          message:
            "Sorry, there was a problem downloading your data. Please try again later.",
        });
      });
  };

  return (
    <button onClick={handleClick}>
      <Icon width="1rem" {...styleProps}>
        <ExportSVG />
      </Icon>
      Export home data
    </button>
  );
}
