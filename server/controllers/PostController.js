const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//TODO: Get one post.
const onePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "Post fetch successfully!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch post!",
    });
  }
};

//TODO: Get user's post.
const userPosts = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Post: {
          include: {
            likers: true,
          },
        },
      },
    });
    delete user["password"];
    res.status(200).json({
      message: "Post fetch successfully!",
      userPosts: user.Post,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch post!",
    });
  }
};

//TODO: Get post likers.
const postLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        likers: true,
      },
    });

    res.status(200).json({
      message: "Post fetch successfully!",
      userPosts: post.likers,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch post!",
    });
  }
};

//TODO: Like/Unlike a post.
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    // Check if the like already exists for the user and post
    const existingLike = await prisma.like.findFirst({
      where: {
        liker_id: userId,
        post: {
          id: postId,
        },
      },
    });
    if (existingLike) {
      // If the like exists, remove it to unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.status(200).json({
        message: "Post unliked successfully",
      });
    } else {
      // If the like doesn't exist, create a new like to like the post
      const newLike = await prisma.like.create({
        data: {
          liker_id: userId,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      res.status(201).json({
        message: "Post liked successfully!",
        like: newLike,
      });
    }
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    res.status(500).json({
      error: "Failed to like/unlike post!",
    });
  }
};

//TODO: Get post likes count
const postLikesCount = async (req, res) => {
  try {
    const postID = req.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
      select: {
        _count: true,
      },
    });
    res.status(200).json({
      message: "Post like count fetched!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get  likes count.",
    });
  }
};

//TODO: Get all post only.
const allPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.status(200).json({
      message: "All posts fetch successfully!",
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all the posts!",
    });
  }
};

//TODO: Get all post with creator.
const allPostsWithCreator = async (req, res) => {
  try {
    let allPosts = await prisma.post.findMany({
      include: {
        creator: true,
      },
    });
    allPosts.map((post) => delete post.creator["password"]);
    res.status(200).json({
      message: "All posts fetch successfully!",
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all the posts!",
    });
  }
};

//TODO: Get all post with creator and likers.
const allPostsWithCreatorandLikers = async (req, res) => {
  try {
    let allPosts = await prisma.post.findMany({
      include: {
        creator: true,
        likers: true,
      },
    });
    allPosts.map((post) => delete post.creator["password"]);
    res.status(200).json({
      message: "All posts fetch successfully!",
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all the posts!",
    });
  }
};

//TODO: create new post.
const createPost = async (req, res) => {
  try {
    const { post } = req.body;
    const id = req.params.id;

    const newPost = await prisma.post.create({
      data: {
        post,
        creatorId: id,
      },
    });
    res.status(200).json({
      message: "Post created successfully!",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create new posts!",
    });
  }
};

//TODO: update post.
const updatePost = async (req, res) => {
  try {
    const { post } = req.body;
    const id = req.params.id;

    const newPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        post,
      },
    });
    res.status(200).json({
      message: "Post updated successfully!",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update posts!",
    });
  }
};

//TODO: delete post.
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      error: "Post deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete posts!",
    });
  }
};

module.exports = {
  onePost,
  allPosts,
  likePost,
  postLikes,
  userPosts,
  createPost,
  updatePost,
  deletePost,
  postLikesCount,
  allPostsWithCreator,
  allPostsWithCreatorandLikers,
};
