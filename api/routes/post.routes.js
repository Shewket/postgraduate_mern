const express = require('express');
const {createPost, updatePost, getPosts, getPostById} = require("../controllers/post.controller");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadMiddleware")

router.route("/post").post(uploadMiddleware.single('file'),createPost);
router.route("/post").put(uploadMiddleware.single('file'),updatePost);
router.route("/post").get(getPosts);
router.route("/post/:id").get(getPostById);

module.exports = router;