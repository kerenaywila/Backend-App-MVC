const Users = require("../models/userModel");

//GET ALL INFORMATION FROM DATABASE

const getUsers = async (req, res) => {
  const allUsers = await Users.find();

  return res.status(200).json({
    message: "Successful",
    users: allUsers,
    count: allUsers.length,
  });
};

//GET ONE INFORMATION FROM DATABASE

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({
      message: "Successful",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//UPDATE ONE INFORMATION

const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstname, lastname, email } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { firstname, lastname, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Account not find" });
    }

    return res.status(200).json({
      message: "Successful",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//DELETE INFORMATION

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await Users.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Successfull",
  });
};

//FUND WALLET

//RESET PASSWORD

module.exports = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
};
