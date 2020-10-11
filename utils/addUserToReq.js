import jwt from "jsonwebtoken";

const getUser = async (req) => {
  const { headers } = req;
  const authHeader = headers?.authorization;
  // TODO - split throws error here, no auth Header?
  const token = authHeader.split(" ")[1];
  //todo what if token is undefined?
  return await jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
    if (error) console.error(error);
    if (error) return null;
    return data;
  });
};

const addUserToReq = (handler) => async (req, res) => {
  req.user = await getUser(req);

  if (!req.user) {
    res.status(401).json({});
  } else {
    return handler(req, res);
  }
};

export default addUserToReq;
