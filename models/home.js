const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = require("./asset");

const homeSchema = new Schema({
  name: {
    type: String,
    default: "My Home",
    required: true,
  },
  address: String,
  dateBuilt: Date,
  datePurchased: Date,
  description: String,
  isDefault: {
    type: Boolean,
    required: true,
    default: false,
  },
  assets: [assetSchema],
});

module.exports = mongoose.models.Home || mongoose.model("Home", homeSchema);
