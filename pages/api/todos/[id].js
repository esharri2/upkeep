import User from "../../../models/user";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";

const handler = async (req, res) => {
  await connectToDatabase();

  const { method, query } = req;

  switch (method) {
    case "DELETE":
      try {
        const user = await User.findOne({ email: req.user.email }, "todos");
        user.todos.id(query.id).remove();
        await user.save();
        res.status(200).json({ todos: user.todos });
      } catch (error) {
        sendError(res, null, 400);
      }
      break;
    default:
      sendError(res, null, 405);
  }
};

export default addUserToReq(handler);
