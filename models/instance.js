const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instanceSchema = new Schema({
  note: String,
  date: { type: String, required: true },
});

module.exports = instanceSchema;
