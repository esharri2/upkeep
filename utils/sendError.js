const sendError = (res, error, statusCode) => {
  console.error("Handle server error: ", error);

  /*
   * ClientMessage is a custom message attached to error.
   * Message is likely from DB.
   * If there's no error, no error was passed and it's just generic.
   */
  const message = error
    ? error.clientMessage || error.message
    : "Sorry, something has gone wrong. Please try again a little later.";

  res.status(statusCode).json({ error: message });
};

export default sendError;
