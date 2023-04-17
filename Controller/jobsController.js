const { jobPostModel } = require("../Model/jobsModel")


exports.getAllJobs = async (req, res) => {
    try {
        const result = await jobPostModel.find({}).populate('candidates').populate('category')
        res.send(result)
    } catch (error) {
        res.send(error)
    }

}
exports.getSingleJob = async (req, res) => {
    try {
        const result = await jobPostModel.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.send(error)
    }

}

exports.postJobs = async (req, res) => {
    try {
        const body = req.body;
        const result = await new jobPostModel(body).save()
        res.send(result)
    } catch (error) {
        res.send(400).json("Failed to post jobs")
    }
}
exports.deleteJobPost = async (req, res) => {
    res.send(await jobPostModel.findByIdAndDelete(req.params.id))
};

exports.deleteAllJobPosts = async (req, res) => {
    res.send(await jobPostModel.deleteMany());
};