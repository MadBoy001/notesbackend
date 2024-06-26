const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

noteSchema.set("toJSON", {
  virtuals: true,
});

exports.Note = mongoose.model("Note", noteSchema);
