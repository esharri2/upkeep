const sendError = (res, statusCode, error, message) => {
  console.log("------Error------");
  console.error(error);
  console.log("-----Custom Error Message------");
  console.error(message);

  /*
   * ClientMessage is a custom message attached to error.
   * Message is likely from DB.
   * If there's no error, no error was passed and it's just generic.
   */
  const userMessage =
    message ||
    error.message ||
    "Sorry, something has gone wrong. Please try again a little later.";

  res.status(statusCode).json({ error: userMessage });
};

export default sendError;
