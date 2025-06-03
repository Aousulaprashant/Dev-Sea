const express = require("express");
const ConnectDB = require("./db/connectDB");

const UserRouters = require("./routes/User.routes");
const PostRouts = require("./routes/quations.routes");
const AnswerRoutes = require("./routes/answers.Routes");
const firebaseRoutes = require("./routes/apiRoutes");

const tagRoutes = require("./routes/tags.routes");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

ConnectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Your React frontend origin
    credentials: true,
  })
); // Frontend URL here

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
