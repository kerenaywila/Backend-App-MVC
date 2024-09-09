const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerFunction = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    //check for exiting user
    const alreadyExisting = await Users.findOne({ email });

    if (alreadyExisting) {
      res
        .status(400)
        .json({ message: "This email already has an existing account" });
    }

    //hash password

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Users({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "Account Created",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginFunction = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password or email!" });
    }

    const accessToken = jwt.sign({ user }, `${process.env.ACCESS_TOKEN}`, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign({ user }, `${process.env.REFRESH_TOKEN}`, {
      expiresIn: "50m",
    });

    return res.status(200).json({
      message: "Login Successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerFunction,
  loginFunction,
};
