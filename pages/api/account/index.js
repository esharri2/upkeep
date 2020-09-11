import connectToDatabase from "../../../utils/connectToDatabase";
import createToken from "../../../utils/createToken";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";
import User from "../../../models/user";
import Home from "../../../models/home";

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

function getAssetData() {
  const assets = [
    {
      canonicalId: 1,
      name: "Refriderator",
      tasks: [
        {
          canonicalId: 11,
          name: "Defrost",
          description: "Power off your freezer and let ice build up melt",
          frequency: 360,
        },
      ],
    },
    {
      canonicalId: 2,
      name: "Stove",
      tasks: [
        {
          canonicalId: 21,
          name: "Wash burner drip plates",
          description:
            "Remove and wash burner drip plates, or replace them if they are corroded",
        },
      ],
    },
    {
      canonicalId: 3,
      name: "Gutters",
      tasks: [
        {
          canonicalId: 31,
          name: "Clean",
          description: "Remove stuff from gutters.",
        },
      ],
    },
  ];

  return assets;
}
