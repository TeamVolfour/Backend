const { Schema, model } = require("mongoose");

const jobCategoryModel = new Schema({
  name: { type: String, required: true },
  photoUrl: {
    type: Buffer,
    contentType: String
  }
});

const JobCategoryModel = model("JobCategory", jobCategoryModel);

exports.JobCategoryModel = JobCategoryModel;
