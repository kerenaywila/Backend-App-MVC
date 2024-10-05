const express = require("express");
const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  resetPassword,
} = require("../controllers/userCtrl");
const { validateToken } = require("../middleware/validateAuth");

const router = express.Router();

router.get("/get-users", validateToken, getUsers);

router.get("/get-user/:id", validateToken, getUser);

router.put("/edit-user/:id", validateToken, editUser);

router.delete("/delete-user/:id", validateToken, deleteUser);

router.put("/reset-password", validateToken, resetPassword);

module.exports = router;
