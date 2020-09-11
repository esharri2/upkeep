const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Home = require("./home");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: true },
  homes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Home",
    },
  ],
  isLocked: { type: Boolean, default: false },
  failedLogins: [{ type: Number }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
