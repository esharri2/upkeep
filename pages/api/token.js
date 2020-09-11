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
      // TODO these query conditions copy/pasted from login route - maybe need utility to fetch user + default home id?
      // TODO logic for getting homeId from data is duplicated as well
      const homeQueryConditions = {
        path: "homes",
        match: { isDefault: true },
        select: "_id",
      };
      const user = await User.findOne({ refreshToken }).populate(
        homeQueryConditions
      );
      const email = user?.email;

      // If user email matches email from refresh token, send a new access token
      if (email && email === refreshTokenContents?.email) {
        const homeId = user.homes[0] ? user.homes[0]._id : null;
        const accessToken = createToken(
          { email, homeId },
          process.env.TOKEN_EXPIRATION
        );
        res.status(200).json({
          accessToken,
          email,
        });
      } else {
        sendError(res, 401);
      }
      break;
    default:
      sendError(res, 405);
  }
};
