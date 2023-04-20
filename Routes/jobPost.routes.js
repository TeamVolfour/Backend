const express = require("express");
const {
  getAllJobs,
  getSingleJob,
  postJobs,
  deleteJobPost,
  deleteAllJobPosts,
} = require("../Controller/jobsController");
const { jobMiddleware } = require("../Middleware/job.middleware");

const router = express.Router();

router
  .get("/jobs", getAllJobs)
  .get("/job/:id", getSingleJob)
  .post("/jobs", jobMiddleware, postJobs)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
