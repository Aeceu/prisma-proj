const express = require("express");
const {
  allPosts,
  allPostsWithCreator,
  allPostsWithCreatorandLikers,
  createPost,
  deletePost,
  updatePost,
  onePost,
  userPosts,
  postLikes,
  likePost,
  postLikesCount,
} = require("../controllers/PostController");

const router = express.Router();

//TODO: Handle all the posts.
router.get("/allposts", allPosts);
router.get("/allpostswithcreator", allPostsWithCreator);
router.get("/allpostswithcreatorandlikes", allPostsWithCreatorandLikers);

//TODO: Handle user posts.
router.get("/userpost/:id", userPosts);

//TODO: Handle likes.
router.get("/postlikescount/:id", postLikesCount);
router.get("/postlikes/:id", postLikes);
router.post("/likepost/:id", likePost);

//TODO: User CRUD.
router.get("/post/:id", onePost);
router.post("/post/:id", createPost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
