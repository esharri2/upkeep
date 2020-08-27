import User from "../../../models/user";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";

const handler = async (req, res) => {
  await connectToDatabase();
  const { method, query } = req;
  const email = req?.user?.email;

  switch (method) {
    case "DELETE":
      try {
        if (email && email === query.email) {
          await User.deleteOne({ email });
          res.status(200).json({});
        } else {
          throw new Error(
            "Sorry. We were unable to delete your account. Please try agan later."
          );
        }
      } catch (error) {
        sendError(res, error, 401);
      }
      break;
    default:
      sendError(res, null, 405);
  }
};

export default addUserToReq(handler);
