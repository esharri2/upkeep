const crypto = require("crypto");

export default function createResetPasswordToken() {
  return crypto.randomBytes(16).toString("hex");
}
