const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const validateRegistration = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const errors = [];

  if (!firstname) {
    errors.push("Please enter your first name");
  }
  if (!lastname) {
    errors.push("Please enter your last name");
  }
  if (!email) {
    errors.push("Please enter your email");
  }
  if (!password) {
    errors.push("Please enter your pasword");
  }
  if (password.length < 8) {
    errors.push("Password should have atleast 8 characters");
  }
  if (errors.length > 0) {
    return res.status(400).json({
      message: errors,
    });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Please add your email");
  } else if (!validEmail(email)) {
    errors.push("Email format is incorrect");
  }

  if (!password) {
    errors.push("Please add your password");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors,
    });
  }

  next();
};

function validEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateToken = async (req, res, next) => {
  try {
    const tk = req.header("Authorization");

    if (!tk) {
      return res.status(401).json({ message: "Access Denied!" });
    }

    const tkk = tk.split(" ");

    const token = tkk[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    console.log({ decoded });

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Login details" });
    }

    const user = await Users.findOne({ email: decoded.user.email });

    if (!user) {
      return res.status(404).json({ message: "User account not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
  validEmail,
  validateToken,
};
