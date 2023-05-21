const express = require("express");
const { getBlogs, getBlog, createBlog, deleteAllBlogs, deleteBlog } = require("../Controller/blog.controller");
const { roleMiddleware } = require("../Middleware/role.middleware");
const { createBlogCategory, getBlogCategories } = require("../Controller/blogCategory.controller");
const { upload } = require("../functions/multerFunctions");

const router = express.Router();

router
    .get("/blogs", getBlogs)
    .get("/blog/:id", getBlog)
    .get("/blogs/categories", getBlogCategories)
    .post("/blogs/categories", createBlogCategory)
    .post("/blogs", roleMiddleware(302, 301), createBlog)
    .delete("/blogs", deleteAllBlogs)
    .delete("/blog/:id", deleteBlog);

exports.blogRouter = router;
