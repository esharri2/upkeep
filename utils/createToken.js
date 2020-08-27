import jwt from "jsonwebtoken";

const createToken = (email, expiration) =>
  jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: expiration,
  });

export default createToken;
