const express = require("express");
const cors = require("cors");

const {
  updatePost,
  deletePost,
  getPostByID,
  getAllPosts,
  createPost,
} = require("../controllers/post.controllers");

const router = express.Router();

router.post("/", cors(), createPost);

/*
@method: GET
@ path:http:localhost:4000/api/Post/
@ parameter
public
*/
router.get("/", cors(), getAllPosts);

/*
@method: GET
@ path:http:localhost:4000/api/Post/:id
@ parameter
public
*/
router.get("/:id", cors(), getPostByID);

/*
@method: DELETE
@ path:http:localhost:4000/api/Post/:id
@ parameter
public
*/
router.delete("/:id", cors(), deletePost);

/*
@method: PUT
@ path:http:localhost:4000/api/Post/:id
@ parameter: body 
public
*/
router.put("/:id", cors(), updatePost);

module.exports = router;
