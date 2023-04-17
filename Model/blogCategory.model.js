const { Schema, model } = require("mongoose");

const blogCategoryModel = new Schema({
    name: { type: String, required: true },
});

const BlogCategoryModel = model("BlogCategory", blogCategoryModel);

exports.BlogCategoryModel = BlogCategoryModel;
