const express = require("express");
const ConnectDB = require("./db/connectDB");

const UserRouters = require("./routes/User.routes");
const PostRouts = require("./routes/quations.routes");
const AnswerRoutes = require("./routes/answers.Routes");
const firebaseRoutes = require("./routes/apiRoutes");

const tagRoutes = require("./routes/tags.routes");

const app = express();

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://dev-sea-nru4.vercel.app",
];

// ✅ Apply CORS only once
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

ConnectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/tags", tagRoutes);
app.use("/api/Auth", firebaseRoutes);
app.use("/api/Auth", UserRouters);
app.use("/api/posts/", PostRouts);
app.use("/api/answers", AnswerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
