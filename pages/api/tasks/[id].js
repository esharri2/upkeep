import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";
import getDueInDays from "../../../utils/getDueInDays";

const handler = async (req, res) => {
  await connectToDatabase();

  const { body: rawBody, method, query, user } = req;
  const body = sanitize(rawBody);

  switch (method) {
    case "GET":
      try {
        const home = await Home.findOne({ _id: user.homeId }, "assets").lean();
        // Get asset with the task
        const task = (() => {
          for (const asset of home.assets) {
            const task = asset.tasks.find((task) => task._id.equals(query.id));
            if (task) {
              task.asset = asset.name;
              task.assetId = asset._id;
              task.dueIn = getDueInDays(task);
              return task;
            }
          }
        })();
        if (!task) throw new Error();
        res.status(200).json({ task });
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    case "POST":
      try {
        const home = await Home.findOne({ _id: user.homeId }, "assets");
        let task = home.assets.id(query.assetId).tasks.id(query.id);
        // todo what if no task?
        task = Object.assign(task, body);
        await home.save();
        res.status(200).json({});
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

export default addUserToReq(handler);
