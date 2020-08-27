import User from "../../models/user";
import connectToDatabase from "../../utils/connectToDatabase";
import addUserToReq from "../../utils/addUserToReq";
import sendError from "../../utils/sendError";
import { hashPassword, checkPassword } from "../../utils/bcrypt";
import sanitize from "../../utils/sanitize";

const handler = async (req, res) => {
  await connectToDatabase();

  const { body, method, user } = req;
  const { oldPassword, newPassword } = sanitize(body);

  switch (method) {
    case "POST":
      try {
        const data = await User.findOne({ email: user.email }, "password");
        const passwordMatches = await checkPassword(oldPassword, data.password);
        if (passwordMatches) {
          const newHashedPassword = await hashPassword(newPassword);
          data.password = newHashedPassword;
          await data.save();
          res.status(200).json({});
        } else {
          throw new Error("Your old password is incorrect.");
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
