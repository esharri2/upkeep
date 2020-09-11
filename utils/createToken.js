import jwt from "jsonwebtoken";

const createToken = (data, expiration) =>
  jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: expiration,
  });

export default createToken;
