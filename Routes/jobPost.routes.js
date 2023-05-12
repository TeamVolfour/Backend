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
const { generateCerti } = require("../functions/generateCertificate");

const router = express.Router();

router
  .get("/jobs", getAllJobs)
  .get("/job/:id", getSingleJob)
  .post("/jobs", roleMiddleware(301, 302), postJobs)
  .post("/job-apply-doc", createApplyDoc)
  .delete("/apply-doc", deleteApplyDoc)
  .post("/user-jobs", getUserJobs)
  .put("/approve", approvePendingCandidates)

  .put("/job-apply", addToPendingApplies)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
