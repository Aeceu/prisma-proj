const {
  decryptPassword,
  encryptPassword,
} = require("../utils/EncryptAndDecrypt");
const { PrismaClient } = require("@prisma/client");
const createToken = require("../utils/createToken");
const prisma = new PrismaClient();

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(500).json({
        error: "Failed to login. Email incorrect!",
      });
    }

    const isValid = await decryptPassword(password, user.password);
    if (!isValid) {
      return res.status(500).json({
        error: "Failed to login. password incorrect!",
      });
    }

    const userdata = {
      id: user.id,
      role: user.role,
    };

    const token = createToken(userdata);
    res.cookie("token", token, {
      httpOnly: true,
    });

    delete user["password"];

    res.status(200).json({
      message: "User created successfully!",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to login user",
    });
  }
};

const handleSignUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(500).json({
        error: "Failed to register. Email already taken!",
      });
    }

    const hashedPass = await encryptPassword(password);
    let newUser = await prisma.user.create({
      data: { firstname, lastname, email, password: hashedPass },
    });

    delete newUser["password"];

    res.status(200).json({
      message: "User created successfully!",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user",
    });
  }
};

const handleLogOut = async (req, res) => {
  res.clearCookie("token");
  res.send("cookie removed");
};

module.exports = { handleLogin, handleSignUp, handleLogOut };
