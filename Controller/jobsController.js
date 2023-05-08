const multer = require("multer");
const { ApplyDocModel } = require("../Model/applyDocument.model");
const { candidateModel } = require("../Model/candidateModel");
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var tempFileArr = file.originalname.split(".");
    var tempFileName = tempFileArr[0];
    var tempFileExtension = tempFileArr[1];

    cb(null, tempFileName + "-" + Date.now() + "." + tempFileExtension);
  },
});

const upload = multer({
  storage: storage, fileFilter: (req, file, callback) => {
    const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
    if (!(acceptableExtensions.some(extension =>
      path.extname(file.originalname).toLowerCase() === `.${extension}`)
    )) {
      return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
    }
    callback(null, true)
  }
}).single("image");


exports.postJobs = async (req, res) => {


  upload(req, res, (err) => {
    if (err) return console.log(err);
    const jobDoc = new jobPostModel({
      title: req.body.title,
      content: req.body.content,
      emplyerEmail: req.body.emplyerEmail,
      category: req.body.category,
      deadline: req.body.deadline,
      experience: req.body.experience,
      location: req.body.location,
      tags: req.body.tags,
      creator: req.body.creator,
      pendingCandidates: req.body.pendingCandidates,
      approvedCandidates: req.body.approvedCandidates,
      bannerImg: fs.readFileSync(
        path.join(
          __dirname.substring(0, __dirname.lastIndexOf("/")) +
          "/Images/" +
          req.file.filename
        )
      ),
    });

    jobDoc
      .save()
      .then(() => res.send(jobDoc))
      .catch((err) => console.log(err));
  });
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
  const allJobs = await jobPostModel
    .find({})
    .populate("creator")
    .populate("category")
    .populate("pendingCandidates")
    .populate("approvedCandidates");

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
exports.approvePendingCandidates = async (req, res) => {
  const job = await jobPostModel.findOne({ _id: req.body.jobId });


  for (let i = 0; i < job.pendingCandidates.length; i++) {
    if (job.pendingCandidates[0]._id == req.body.appId) {
      const index = job.pendingCandidates.indexOf();
      job.pendingCandidates.splice(index, 1);
      console.log("removed");
    }
  }
  const id = req.body.appId;
  job.approvedCandidates.push(id);

  const result = await jobPostModel.findByIdAndUpdate(req.body.jobId, job);

  res.send(result);
};
