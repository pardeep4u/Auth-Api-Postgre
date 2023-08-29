const express = require("express");
const createUserValidation = require("../util/validation");
const updateOneUserValidation = require("../util/updateValidation");

const authRouter = express.Router();
const {
  postSignUp,
  getAllUsers,
  getSingleUser,
  updateOneUser,
  deleteOneUser,
  postLogin,
} = require("../controller/authController");

authRouter.post("/users", createUserValidation, postSignUp);
authRouter.get("/users", getAllUsers);
authRouter.get("/users/:id", getSingleUser);
authRouter.put("/users/:id", updateOneUserValidation, updateOneUser);
authRouter.delete("/users/:id", deleteOneUser);
authRouter.post("/login", postLogin);

module.exports = {
  authRouter,
};
