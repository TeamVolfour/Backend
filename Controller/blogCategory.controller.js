
const { BlogCategoryModel } = require("../Model/blogCategory.model");


exports.getBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategoryModel.find({});
        res.send(categories);
    } catch (error) {
        res.send(error);
    }
};

exports.createBlogCategory = async (req, res) => {
    const { name } = req.body || {};
    try {
        const data = await BlogCategoryModel.find({ name: name })
        if (data.length != 0) {
            return res.send("This category already registered")
        }
        const categoryDoc = new BlogCategoryModel({ name });
        const category = await categoryDoc.save();
        res.send(category);
    } catch (error) {
        res.send(error);
    }
};