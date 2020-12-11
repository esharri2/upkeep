export default function useStatus() {
  const [type, setType] = useState();
  const [message, setMessage] = useState();

  const setStatus = (type, message) => {
    let typeString = "";
    if (type === true) {
      typeString = "success";
    } else if (type === false) {
      typeString = "failure";
    }
    setType(typeString);
    setMessage(message);
  };

  return [status, message, setStatus];
}
