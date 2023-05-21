const { Schema, model, Types, SchemaTypes } = require("mongoose");
const Blog = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: [
    { type: Schema.Types.ObjectId, required: true, ref: "BlogCategory" },
  ],
  bannerImg: Buffer,
  comment: [{ type: Schema.Types.ObjectId, ref: "BlogComment" }],
  creatorId: { type: Schema.Types.ObjectId, ref: "Recruiter" },
  createdAt: { type: Date, default: Date.now() },
});

const BlogModel = model("Blog", Blog);
module.exports = { BlogModel };
