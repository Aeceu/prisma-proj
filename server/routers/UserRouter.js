const express = require("express");
const {
  allUsers,
  allUsersWithPosts,
  allUsersWithPostsAndLikes,
  deletedUser,
  updateUser,
  oneUser,
  oneUserWithPosts,
  oneUserWithPostsAndLikes,
} = require("../controllers/UserController");

const router = express.Router();

//TODO: Handles all the user and their posts.
router.get("/allusers", allUsers);
router.get("/alluserswithposts", allUsersWithPosts);
router.get("/alluserswithpostsandlikes", allUsersWithPostsAndLikes);

//TODO: Handles user with it posts
router.get("/userwithposts/:id", oneUserWithPosts);
router.get("/userwithpostsandlikes/:id", oneUserWithPostsAndLikes);

//TODO: Handles CRUD
router.get("/user/:id", oneUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deletedUser);

module.exports = router;
