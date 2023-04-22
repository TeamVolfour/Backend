const { jobPostModel } = require("../Model/jobsModel");

exports.getAllJobs = async (req, res) => {
  try {
    const result = await jobPostModel
      .find({})
      .populate("pendingCandidates")
      .populate("approvedCandidates")
      .populate("category")
      .populate("creatorId");
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};
exports.getSingleJob = async (req, res) => {
  try {
    const result = await jobPostModel
      .findById(req.params.id)
      .populate("pendingCandidates")
      .populate("approvedCandidates")
      .populate("category")
      .populate("creator");
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

exports.postJobs = async (req, res) => {
  try {
    const body = req.body;
    const result = await new jobPostModel(body).save();
    return res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.deleteJobPost = async (req, res) => {
  res.send(await jobPostModel.findByIdAndDelete(req.params.id));
};

exports.deleteAllJobPosts = async (req, res) => {
  res.send(await jobPostModel.deleteMany());
};
