import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";

const handler = async (req, res) => {
  await connectToDatabase();

  const { method, user, query, body: rawBody } = req;
  const body = sanitize(rawBody);

  switch (method) {
    case "POST":
      try {
        const home = await Home.findOne({ _id: user.homeId }, "assets");
        let taskIsUpdated = false;

        // Go over assets and find the task, update instances array
        for (const asset of home.assets) {
          const task = asset.tasks.find((task) =>
            task._id.equals(query.taskId)
          );
          if (task) {
            console.log(body);
            task.instances.push(body);
            taskIsUpdated = true;
            break;
          }
        }

        if (taskIsUpdated) {
          await home.save();
          res.status(200).json({});
        } else {
          throw new Error();
        }
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

export default addUserToReq(handler);
