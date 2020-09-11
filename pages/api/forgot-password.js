import User from "../../models/user";
import connectToDatabase from "../../utils/connectToDatabase";
import sendError from "../../utils/sendError";
import createPasswordResetToken from "../../utils/createResetPasswordToken";
import sendEmail from "../../utils/sendEmail";
import sanitize from "../../utils/sanitize";

const getEmailBody = (token) => `
              <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
              <p>Please click on the following link, or paste this into your browser to complete the process: <a href='${process.env.ORIGIN}/reset-password/${token}'>${process.env.ORIGIN}/reset-password/${token}</a> </p>          
              <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
              `;

export default async (req, res) => {
  await connectToDatabase();

  const { body, method } = req;
  const { email } = sanitize(body);
  let user;

  switch (method) {
    case "POST":
      try {
        user = await User.findOne({ email }, "email password");
        if (!user) throw new Error("There is no user with this email.");
        user.resetPasswordToken = createPasswordResetToken();
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
      } catch (error) {
        sendError(res, 403, error);
      }
      try {
        await sendEmail(
          process.env.TRANSPORTER_EMAIL,
          user.email,
          `Password recovery for Upkeep`,
          getEmailBody(user.resetPasswordToken)
        );
        res.status(200).json({});
      } catch (error) {
        sendError(res, 404, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};
