import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";

// TODO copy and paste form tODO ,rewrite whole thing

const handler = async (req, res) => {
  await connectToDatabase();

  const { method, user } = req;

  switch (method) {
    case "GET":
      try {
        const home = await Home.findOne(
          { _id: user.homeId },
          "assets.name assets._id assets.owned"
        );
        home.assets.sort((a, b) => (a.name > b.name ? 1 : -1));

        res.status(200).json({ assets: home.assets });
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    case "POST":
      try {
        // TODO should be an array of objects representing the upate, not just id string (works but kinda goofy?)
        const { assetIds } = req.body;

        if (assetIds.length > 0) {
          const home = await Home.findOne({ _id: user.homeId }, "assets._id");
          for (const asset of home.assets) {
            if (assetIds.includes(asset._id.toString())) {
              asset.owned = true;
            } else {
              asset.owned = false;
            }
          }
          await home.save();
          res.status(200).json({});
        } else {
          res.status(200).json({});
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
