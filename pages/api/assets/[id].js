import Home from "../../../models/home";
import connectToDatabase from "../../../utils/connectToDatabase";
import addUserToReq from "../../../utils/addUserToReq";
import sendError from "../../../utils/sendError";
import sanitize from "../../../utils/sanitize";

// TODO copy and paste form tODO ,rewrite whole thing

const handler = async (req, res) => {
  await connectToDatabase();

  const { body, method, query, user } = req;

  switch (method) {
    case "GET":
      //   try {
      //     const home = await Home.findOne(
      //       { _id: user.homeId },
      //       "assets.name assets._id assets.owned"
      //     );
      //     res.status(200).json({ assets: home.assets });
      //   } catch (error) {
      //     sendError(res, 400, error);
      //   }
      break;
    case "POST":
      try {
        const home = await Home.findOne({ _id: user.homeId }, "assets");
        let asset = home.assets.id(query.id);
        asset = Object.assign(asset, body);
        await home.save();
        res.status(200).json({});

        // const { assetIds } = req.body;
        // if (assetIds.length > 0) {
        //   const home = await Home.findOne({ _id: user.homeId }, "assets._id");
        //   for (const asset of home.assets) {
        //     if (assetIds.includes(asset._id.toString())) {
        //       asset.owned = true;
        //     } else {
        //       asset.owned = false;
        //     }
        //   }
        //   await home.save();
        //   res.status(200).json({});
        // } else {
        //   res.status(200).json({});
        // }
      } catch (error) {
        sendError(res, 400, error);
      }
      break;
    default:
      sendError(res, 405);
  }
};

export default addUserToReq(handler);
