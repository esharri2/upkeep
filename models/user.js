const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var todoSchema = require("./todo");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: true },
  todos: [todoSchema],
  isLocked: { type: Boolean, default: false },
  failedLogins: [{ type: Number }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
