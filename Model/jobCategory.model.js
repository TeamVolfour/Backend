const { Schema, model } = require("mongoose");

const jobCategoryModel = new Schema({
  name: { type: String, required: true },
  photoUrl: String,
});

const JobCategoryModel = model("JobCategory", jobCategoryModel);

exports.JobCategoryModel = JobCategoryModel;
