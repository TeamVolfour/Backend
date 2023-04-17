const express = require("express");
const { getCategories, createCategory } = require("../Controller/jobCategory.controller");


const router = express.Router();

router
    .get("/categories", getCategories)
    .post("/categories", createCategory)

exports.jobCategoryRouter = router;
