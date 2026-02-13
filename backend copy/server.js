const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(express.json());

dotenv.config();

const port = process.env.PORT;

const conn = require("./config");

app.use(cors());

// Configure CORS to allow requests from your frontend's origin
app.use(
  cors({
    origin: "http://localhost:5175", // Allow only your frontend's origin
    credentials: true, // Allow sending cookies/credentials
  })
);

const userroutes = require("./routes/user.routes");
app.use("/api/user/", userroutes);

conn.connect((err, result) => {
  if (err) return err.message;
  console.log("connected");
});

app.listen(port, () => {
  console.log(`listening to port ${port} `);
});
