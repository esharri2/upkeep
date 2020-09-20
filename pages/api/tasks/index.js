import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";

const handler = async (req, res) => {
  await connectToDatabase();

  const { method, user } = req;

  switch (method) {
    case "GET":
      try {
        // TODO redo to just get tasks
        const home = await Home.findOne(
          { _id: user.homeId },
          "assets.name assets._id assets.owned assets.tasks"
        );

        res.status(200).json({ assets: home.assets });
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

export default addUserToReq(handler);
