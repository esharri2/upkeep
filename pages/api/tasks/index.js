import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import getDueInDays from "../../../utils/getDueInDays";

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
        ).lean();

        // Add item names to tasks

        for (const asset of home.assets) {
          for (const task of asset.tasks) {
            task.asset = asset.name;
            task.dueIn = getDueInDays(task);
          }
        }

        const ownedAssets = home.assets.filter((asset) => asset.owned);

        res.status(200).json({ assets: ownedAssets });
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

export default addUserToReq(handler);
