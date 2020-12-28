import connectToDatabase from "../../utils/connectToDatabase";
import createToken from "../../utils/createToken";
import sendError from "../../utils/sendError";
import jwt from "jsonwebtoken";
import sanitize from "../../utils/sanitize";
import setRefreshTokenHeader from "../../utils/setRefreshTokenHeader";
import User from "../../models/user";
import { checkPassword } from "../../utils/bcrypt";

export default async (req, res) => {
  await connectToDatabase();

  const { body, cookies, method } = req;
  let { email, password } = sanitize(body);
  let refreshToken = cookies?.refreshToken;
  let user;

  switch (method) {
    case "POST":
      // todo throws cannot read proper homes of undefined sometimes?

      const homeQueryConditions = {
        path: "homes",
        match: { isDefault: true },
        select: "_id",
      };
      try {
        if (email && password) {
          // Login with email and password.
          user = await User.findOne({ email }).populate(homeQueryConditions);
          if (!user) throw new Error("Sorry, we can't find this account.");

          if (user.isLocked) {
            throw new Error(
              "Your account is locked from too many failed login attempts. Please reset your password."
            );
          }

          const compare = await checkPassword(password, user.password);

          if (!compare) {
            // user.failedLogins = user.failedLogins || []
            user.failedLogins.push(new Date().getTime());

            // Check for failed logins in the last two minutes.
            const recentFailedLogins = user.failedLogins.filter(
              (time) => time > new Date().getTime() - 1000 * 60 * 2
            );

            if (recentFailedLogins.length > 4) {
              user.isLocked = true;
              await user.save();
              throw new Error(
                "You've tried to log in too many times with an incorrect password. Please try again later, or reset your password."
              );
            } else {
              await user.save();
              throw new Error("Incorrect password.");
            }
          }
          refreshToken = user.refreshToken;
        } else if (refreshToken && !user) {
          // Search for user by refreshToken (auto-login flow).
          user = await User.findOne({ refreshToken }).populate(
            homeQueryConditions
          );
          if (!user) throw new Error();
          email = user.email;
        }

        // Renew the refresh token in db if it's expired or past max age.
        if (user) {
          const renewedRefreshToken = await renewRefreshToken(
            refreshToken,
            user
          );
          if (renewedRefreshToken) refreshToken = renewedRefreshToken;
        }

        // Get id of default home for the token
        const homeId = user.homes[0] ? user.homes[0]._id : null;

        // Final check that user and refresh token have been set
        if (user && refreshToken && homeId) {
          setRefreshTokenHeader(res, refreshToken);
        } else {
          throw new Error("Unable to login.");
        }

        res.status(200).json({
          accessToken: createToken(
            { email, homeId },
            process.env.TOKEN_EXPIRATION
          ),
          email,
          homeId,
        });
      } catch (error) {
        console.error(error);
        sendError(res, 401, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

async function renewRefreshToken(refreshToken, user) {
  try {
    jwt.verify(refreshToken, process.env.SECRET_KEY, {
      maxAge: "7d",
    });
    return false;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      const freshRefreshtoken = createToken(
        { email: user.email },
        process.env.REFRESH_TOKEN_EXPIRATION
      );
      user.refreshToken = freshRefreshtoken;
      await user.save();
      return freshRefreshtoken;
    }
  }
}
