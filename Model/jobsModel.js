const { Schema, model, Types, SchemaTypes } = require("mongoose");
;

const JobPost = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, required: true, ref: 'JobCategory' }],
    bannerImg: String,
    deadline: { type: Date, required: true },
    experience: String,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    creatorId: Schema.Types.ObjectId,
    candidates: [{ type: Schema.Types.ObjectId, ref: 'Candidate' }],
    createdAt: { type: Date, default: Date.now() },


});

const jobPostModel = model("JobPost", JobPost);
module.exports = { jobPostModel };
