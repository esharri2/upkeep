const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  canonicalId: Number,
  frequency: { type: Number, required: true }, //TODO should this be frequencyInDays?
  isMuted: { type: Boolean, default: false },
  notes: String, //TODO check type on this one? May need to allow whitespace or something
  instances: [],
});

module.exports = taskSchema;
