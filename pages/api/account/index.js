const fs = require("fs");

import connectToDatabase from "../../../utils/connectToDatabase";
import createToken from "../../../utils/createToken";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";
import User from "../../../models/user";
import Home from "../../../models/home";
import assetsData from "../../../data/assets.json";

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
        sendError(
          res,
          403,
          error,
          "Sorry, we had trouble signing you up. Please log in if you already have an account."
        );
      }
      break;
    default:
      sendError(res, 405);
  }
};

async function signUp(email, password) {
  const home = new Home();
  home.isDefault = true;
  home.assets = getAssetData();
  const { _id } = await home.save();
  // add items and tasks

  const hashedPassword = await hashPassword(password);
  // create home
  // save it
  // push id to user
  const user = new User({
    email,
    password: hashedPassword,
    refreshToken: createToken({ email }, process.env.REFRESH_TOKEN_EXPIRATION),
    homes: [_id],
  });
  await user.save();
  return user;
}

const getAssetData = () => {
  return assetsData;
};
