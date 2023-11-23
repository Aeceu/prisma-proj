const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { encryptPassword } = require("../utils/EncryptAndDecrypt");

//TODO: Gets one user only.
const oneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user!",
    });
  }
};

//TODO: Gets one user with their posts.
const oneUserWithPosts = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Post: true,
      },
    });
    delete user["password"];
    res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user!",
    });
  }
};

//TODO: Gets one user with their posts and the likes of posts.
const oneUserWithPostsAndLikes = async (req, res) => {
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
      message: "User fetched successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch user!",
    });
  }
};

//TODO: Gets all the users only.
const allUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        password: false,
      },
    });
    res.status(200).json({
      message: "All users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all users!",
    });
  }
};

//TODO: Gets all the user with their posts.
const allUsersWithPosts = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      include: {
        Post: true,
      },
    });
    users.map((user) => delete user["password"]);
    res.status(200).json({
      message: "All users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all users!",
    });
  }
};

//TODO: Gets all the user with their posts and the likes of post.
const allUsersWithPostsAndLikes = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      include: {
        Post: {
          include: {
            likers: true,
          },
        },
      },
    });
    users.map((user) => delete user["password"]);
    res.status(200).json({
      message: "All users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch all users!",
    });
  }
};

//TODO: Updates user information.
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstname, lastname, email } = req.body;
    let updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname,
        lastname,
        email,
      },
    });
    delete updatedUser["password"];
    res.status(200).json({
      message: "User data updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update user info",
    });
  }
};

//TODO: Deletes user.
const deletedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Post: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const postIDs = user.Post.map((post) => post.id);

    await prisma.post.deleteMany({
      where: {
        id: {
          in: postIDs,
        },
      },
    });
    await prisma.user.delete({
      where: { id: id },
      include: {
        Post: true,
      },
    });

    res.status(200).json({
      message: "User and associated posts deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user",
    });
  }
};

module.exports = {
  oneUser,
  allUsers,
  updateUser,
  deletedUser,
  oneUserWithPosts,
  allUsersWithPosts,
  oneUserWithPostsAndLikes,
  allUsersWithPostsAndLikes,
};
