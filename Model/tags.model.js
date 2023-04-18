const { Schema, model } = require("mongoose");

const tagModel = new Schema({
  name: { type: String, required: true },
});

const TagModel = model("Tag", tagModel);

exports.TagModel = TagModel;
