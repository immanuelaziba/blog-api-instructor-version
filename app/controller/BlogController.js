"use strict";
const blogService = require("../services/BlogService")
const response = require("../utils/responses")
const slugify = require("slugify") // ✅ for slug:null


exports.createBlog = async (req, res) => {
  // ✅ Automatically generate slug if not passed
  if (!req.body.slug && req.body.blogTitle) {
    req.body.slug = slugify(req.body.blogTitle, { lower: true, strict: true });
  }

console.log("🚀 Blog request body:", req.body); // 👈 Add this

  const {
    error,
    data,
    statusCode

  } = await blogService.createBlog(req.body, req)

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode)
}

exports.getAllBlogs = async (req, res) => {
  const {
    error,
    data,
    statusCode
  } = await blogService.getAllBlogs(req.query)

  if (error) return response.error(res, error, statusCode);

  return response.paginated(res, data, statusCode)
}


exports.getBlog = async (req, res) => {
  const {
    error,
    data,
    statusCode
  } = await blogService.getBlog(req.params.blogId)

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode)
}

// COMPLETE THE UPDATE AND DELETE ENDPOINTS
// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  // Generate new slug if blogTitle is updated
  if (req.body.blogTitle) {
    req.body.slug = slugify(req.body.blogTitle, { lower: true, strict: true });
  }

  const { error, data, statusCode } = await blogService.updateBlog(req.params.blogId, req.body, req);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  const { error, data, statusCode } = await blogService.deleteBlog(req.params.blogId);

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode);
};

