import Home from "../../models/home";
import connectToDatabase from "../../utils/connectToDatabase";
import addUserToReq from "../../utils/addUserToReq";
import sendError from "../../utils/sendError";

const handler = async (req, res) => {
  await connectToDatabase();
  console.log("hi!");

  const { method, user } = req;

  switch (method) {
    case "GET":
      try {
        const home = await Home.findOne(
          { _id: user.homeId },
          "-_id -assets._id -assets.canonicalId -assets.tasks.canonicalId -assets.tasks._id -assets.tasks.instances._id"
        );
        const dataString = JSON.stringify(home, null, 2);
        res.status(200).end(dataString);
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405, error);
  }
};

export default addUserToReq(handler);
