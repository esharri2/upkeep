import { useContext } from "react";
import StatusContext from "../context/StatusContext";

export default function useStatus() {
  const { status, setStatus, removeStatus } = useContext(StatusContext);
  return { status, setStatus, removeStatus };
}
