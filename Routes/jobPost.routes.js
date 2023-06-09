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
  rejectPendingCandidates,
  addToDoneList,
  rejectApprovedCandidates,
  closeJob,
} = require("../Controller/jobsController");
const { jobMiddleware } = require("../Middleware/job.middleware");
const { roleMiddleware } = require("../Middleware/role.middleware");
const {
  createApplyDoc,
  deleteApplyDoc,
} = require("../Controller/applyDoc.controller");
const { giveCertificate, getCertificate } = require("../Controller/certificate.controller");

const router = express.Router();

router
  .get("/jobs", getAllJobs)
  .get("/job/:id", getSingleJob)
  .post("/jobs", roleMiddleware(301, 302), postJobs)
  .post("/job-apply-doc", createApplyDoc)
  .delete("/apply-doc", deleteApplyDoc)
  .post("/user-jobs", getUserJobs)
  .put("/approve", approvePendingCandidates)
  .put("/reject", rejectPendingCandidates)
  .put("/reject-app", rejectApprovedCandidates)
  .put("/done", addToDoneList)
  .post("/certificate", giveCertificate)
  .get("/certificate/:id", getCertificate)
  .put("/job-apply", addToPendingApplies)
  .put("/close/:id", closeJob)
  .delete("/job/:id", deleteJobPost)
  .delete("/jobs", deleteAllJobPosts);

exports.jobPostRouter = router;
