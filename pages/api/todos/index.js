import User from "../../../models/user";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";

const handler = async (req, res) => {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await User.findOne({ email: req.user.email }, "todos");
        res.status(200).json({ todos: data.todos || [] });
      } catch (error) {
        sendError(res, null, 400);
      }
      break;
    case "POST":
      try {
        const data = await User.findOne({ email: req.user.email }, "todos");
        const { todo } = sanitize(req.body);
        data.todos.push({ text: todo });
        await data.save();
        res.status(200).json({});
      } catch (error) {
        sendError(res, null, 400);
      }
      break;
    default:
      sendError(res, null, 405);
  }
};

export default addUserToReq(handler);
