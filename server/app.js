//packages imports
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//end packages imports

//routes imports
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/user.route.js";
import postsRoutes from "./routes/post.route.js";
import connectDB from "./mongoose/connectdb.js";
//end routes imports

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only the frontend's origin
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.DATABASE_URL);

    app.listen(8080, () => console.log("server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
