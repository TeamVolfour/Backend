const { BlogModel } = require("../Model/blogsModel");

exports.getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id).populate('category').populate('creatorId');
        // const comment = await CommentModel.find({ article: req.params.id })
        res.send(blog);
    } catch (error) {
        res.send(error);
    }
};
exports.getBlogs = async (req, res) => {
    try {
        const blog = await BlogModel.find({}).populate("category").populate('creatorId');
        res.send(blog);
    } catch (error) {
        res.send(error);
    }
};

exports.createBlog = async (req, res) => {
    try {
        const body = req.body;
        if (!body.title) {
            res.status(401).json("Title is required");
            return;
        }
        if (!body.content) {
            res.status(401).json("Texts is required");
            return;
        }
        if (!body.category) {
            res.status(401).json("Category is required");
            return;
        }

        if (!body.creatorId) {
            res.status(401).json("Creator is required");
            return;
        }

        const result = await new BlogModel(body).save();
        res.send(result);
    } catch (error) {
        res.send("Null data")
    }
};

exports.deleteBlog = async (req, res) => {
    res.send(await BlogsModel.findByIdAndDelete(req.params.id))
};
exports.deleteAllBlogs = async (req, res) => {
    res.send(await BlogsModel.deleteMany());
};
