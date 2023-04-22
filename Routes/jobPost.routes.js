const express = require("express");
const {
  getAllJobs,
  getSingleJob,
  postJobs,
  deleteJobPost,
  deleteAllJobPosts,
} = require("../Controller/jobsController");
const { jobMiddleware } = require("../Middleware/job.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");

const router = express.Router();

router
  .get("/jobs", roleMiddleware(401), getAllJobs)
  .get("/job/:id", roleMiddleware(401), getSingleJob)
  .post("/jobs", jobMiddleware, postJobs)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
