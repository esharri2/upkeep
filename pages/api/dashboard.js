import Home from "../../models/home";
import connectToDatabase from "../../utils/connectToDatabase";
import addUserToReq from "../../utils/addUserToReq";
import sendError from "../../utils/sendError";
import getDueInDays from "../../utils/getDueInDays";

// Fetches assorted data points for dashboard

const handler = async (req, res) => {
  await connectToDatabase();

  const { method, user } = req;

  switch (method) {
    case "GET":
      try {
        const home = await Home.findOne(
          { _id: user.homeId },
          "assets.owned assets.name assets.tasks"
        ).lean();
        const assets = home.assets;
        const ownedAssets = assets.filter((asset) => asset.owned);

        const tasksWithoutHistory = [];
        const overdueTasks = [];
        const dueSoonTasks = [];

        for (const asset of ownedAssets) {
          for (const task of asset.tasks) {
            if (!task.instances || task.instances.length === 0) {
              tasksWithoutHistory.push({ ...task, asset: asset.name });
            }
            if (getDueInDays(task) < 1 && task.instances.length > 0) {
              overdueTasks.push({ ...task, asset: asset.name });
            }
          }
        }

        res.status(200).json({
          totalAssets: assets.length,
          ownedAssets: ownedAssets.length,
          tasksWithoutHistory,
          overdueTasks,
          dueSoonTasks,
        });
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405, error);
  }
};

export default addUserToReq(handler);
