const express = require("express");
const {
  getAllJobs,
  getSingleJob,
  postJobs,
  deleteJobPost,
  deleteAllJobPosts,
  addToPendingApplies,
} = require("../Controller/jobsController");
const { jobMiddleware } = require("../Middleware/job.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const { createApplyDoc } = require("../Controller/applyDoc.controller");

const router = express.Router();

router
  .get("/jobs", getAllJobs)
  .get("/job/:id", getSingleJob)
  .post("/jobs", jobMiddleware, postJobs)
  .post('/job-apply-doc', createApplyDoc)
  .put('/job-apply', addToPendingApplies)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
