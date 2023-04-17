const { JobCategoryModel } = require("../Model/jobCategory.model");

exports.getCategories = async (req, res) => {
    try {
        const categories = await JobCategoryModel.find({});
        res.send(categories);
    } catch (error) {
        res.send(error);
    }
};

exports.createCategory = async (req, res) => {
    const { name } = req.body || {};
    try {
        const data = await JobCategoryModel.find({ name: name })
        if (data != 0) {
            return res.send("This category registered")
        }
        const categoryDoc = new JobCategoryModel({ name });
        const category = await categoryDoc.save();
        res.send(category);
    } catch (error) {
        res.send(error);
    }
};