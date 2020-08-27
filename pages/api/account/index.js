import connectToDatabase from "../../../utils/connectToDatabase";
import createToken from "../../../utils/createToken";
import sendError from "../../../utils/sendError";
import jwt from "jsonwebtoken";
import sanitize from "../../../utils/sanitize";
import setRefreshTokenHeader from "../../../utils/setRefreshTokenHeader";
import User from "../../../models/user";
import { hashPassword, checkPassword } from "../../../utils/bcrypt";

// Sign up
export default async (req, res) => {
  await connectToDatabase();
  const { body, method } = req;
  let { email, password } = sanitize(body);

  switch (method) {
    case "POST":
      try {
        if (email && password) {
          const user = await signUp(email, password);
          res.status(200).json(user);
        } else {
          throw new Error("");
        }
      } catch (error) {
        error.clientMessage =
          "Sorry, we had trouble signing you up. Please log in if you already have an account.";
        sendError(res, error, 403);
      }
      break;
    default:
      sendError(res, null, 405);
  }
};

async function signUp(email, password) {
  const hashedPassword = await hashPassword(password);
  const user = new User({
    email,
    password: hashedPassword,
    refreshToken: createToken(email, process.env.REFRESH_TOKEN_EXPIRATION),
  });
  await user.save();
  return user;
}
