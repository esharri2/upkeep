import User from "../../models/user";
import connectToDatabase from "../../utils/connectToDatabase";
import sendError from "../../utils/sendError";
import { hashPassword } from "../../utils/bcrypt";
import sanitize from "../../utils/sanitize";

export default async function (req, res) {
  await connectToDatabase();

  const { body, method } = req;
  const { email, newPassword, resetPasswordToken } = sanitize(body);

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email, resetPasswordToken });
        user.password = await hashPassword(newPassword);
        user.isLocked = false;
        await user.save();
        res.status(200).json({});
      } catch (error) {
        sendError(res, error, 401);
      }
      break;
    default:
      sendError(res, null, 405);
  }
}
