const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require('cors');

app = express();

app.use(cors());

/*const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};*/

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("MONGODB CONNECTED!"));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

app.use("/api", authRouter);

app.use("/api", userRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({
      message: "Welcome to the server, this endpoint does not exist yet!",
    });
});
