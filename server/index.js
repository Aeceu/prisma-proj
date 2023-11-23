const cors = require("cors");
const express = require("express");
const AuthRouter = require("./routers/AuthRouter");
const UserRouter = require("./routers/UserRouter");
const PostRouter = require("./routers/PostRouter");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/requiredAuth");

//* Config
require("dotenv").config();
const app = express();

//* Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://prisma-proj-client.vercel.app",
    credentials: true,
  })
);

//* Routes
app.use("/api/v1", AuthRouter);
app.use("/api/v1", authenticateToken, UserRouter);
app.use("/api/v1", authenticateToken, PostRouter);

//* Listen
const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
