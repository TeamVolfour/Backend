const express = require("express");
const { getAllJobs, getSingleJob, postJobs, deleteJobPost, deleteAllJobPosts } = require("../Controller/jobsController");

const router = express.Router();

router
    .get("/jobs", getAllJobs)
    .get('/job/:id', getSingleJob)
    .post('/jobs', postJobs)
    .delete('/job/:id', deleteJobPost)
    .delete('/jobs', deleteAllJobPosts)

exports.jobPostRouter = router;
