import jwt from "jsonwebtoken";
import connectToDatabase from "../../utils/connectToDatabase";
import createToken from "../../utils/createToken";
import sendError from "../../utils/sendError";

import User from "../../models/user";

export default async (req, res) => {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case "GET":
      const refreshToken = req.cookies?.refreshToken;

      // Read refresh token
      const refreshTokenContents = await jwt.verify(
        refreshToken,
        process.env.SECRET_KEY,
        (error, data) => {
          if (error) console.error(error);
          if (error) return null;
          return data;
        }
      );

      // Find user with refresh token
      const user = await User.findOne({ refreshToken });
      const email = user?.email;

      // If user email matches email from refresh token, send a new access token
      if (email && email === refreshTokenContents?.email) {
        const accessToken = createToken(email, process.env.TOKEN_EXPIRATION);
        console.log(accessToken);
        res.status(200).json({
          accessToken,
          email,
        });
      } else {
        sendError(res, null, 401);
      }
      break;
    default:
      sendError(res, null, 405);
  }
};
