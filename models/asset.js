const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: String,
  model: String,
  modelNumber: String,
  serialNumber: String,
  datePurchased: Date,
  owned: { type: Boolean, default: false },
  canonicalId: Number, //ID for canonical asset; custom asset will not have ID.
  notes: String, //TODO check type on this one? May need to allow whitespace or something
  tasks: [],
});

module.exports = assetSchema;
