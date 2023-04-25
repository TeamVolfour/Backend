const { jobPostModel } = require("../Model/jobsModel");

exports.getAllJobs = async (req, res) => {
  try {
    const result = await jobPostModel
      .find({})
      .populate("pendingCandidates")
      .populate("approvedCandidates")
      .populate("category")
      .populate("creator");
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
exports.addToPendingApplies = async (req, res) => {
  const jobId = req.body.jobId;
  const applyId = req.body.applyId;

  const job = await jobPostModel.findById(jobId);
  job.pendingCandidates = applyId;
  const result = await jobPostModel.findByIdAndUpdate(jobId, job);
  res.send(result);
};
exports.deleteJobPost = async (req, res) => {
  res.send(await jobPostModel.findByIdAndDelete(req.params.id));
};

exports.getUserJobs = async (req, res) => {
  const allJobs = await jobPostModel.find({}).populate("creator");

  for (let i = 0; i < allJobs.length; i++) {
    console.log(allJobs[i].creator);
  }

  const result = allJobs.filter((job) => job.creator.email === req.body.email);
  console.log(result);
  res.send(result);
};
exports.deleteAllJobPosts = async (req, res) => {
  res.send(await jobPostModel.deleteMany());
};
