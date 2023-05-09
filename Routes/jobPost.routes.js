const express = require("express");
const multer = require("multer");
const {
  getAllJobs,
  getSingleJob,
  postJobs,
  deleteJobPost,
  deleteAllJobPosts,
  addToPendingApplies,
  getUserJobs,
  approvePendingCandidates,
} = require("../Controller/jobsController");
const { jobMiddleware } = require("../Middleware/job.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const {
  createApplyDoc,
  deleteApplyDoc,
} = require("../Controller/applyDoc.controller");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "Images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   console.log(file);
//   const acceptableExtensions = [
//     "image/png",
//     "image/jpg",
//     "image/jpeg",
//     "image/jpg",
//   ];
//   if (acceptableExtensions.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({ storage, fileFilter });
router
  .get("/jobs", getAllJobs)
  .get("/job/:id", getSingleJob)
  .post("/jobs", postJobs)
  // roleMiddleware(301, 302)
  .post("/job-apply-doc", createApplyDoc)
  .delete("/apply-doc", deleteApplyDoc)
  .post("/user-jobs", getUserJobs)
  .put("/approve", approvePendingCandidates)
  .put("/job-apply", addToPendingApplies)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
