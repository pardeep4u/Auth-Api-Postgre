const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { AuthModel } = require("../model/authModel");

const postSignUp = async (req, res, next) => {
  // Validate user input using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    // Check if email already exists
    const existingEmailUser = await AuthModel.findOne({
      where: { email },
    });
    if (existingEmailUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Check if username already exists
    const existingUsernameUser = await AuthModel.findOne({
      where: { username },
    });
    if (existingUsernameUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 7);

    // Create a new user
    const newUser = await AuthModel.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Successfully Registered!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};

const postLogin = async (req, res, next) => {
  try {
    const user = await AuthModel.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordMatch) {
        const tokenPayload = {
          email: user.email,
          id: user.id,
        };

        jwt.sign(
          tokenPayload,
          process.env.JWT_SECRET,
          { expiresIn: "10m" },
          (tokenError, token) => {
            if (tokenError) {
              res.status(500).json({ tokenError });
              return;
            }

            res.status(200).json({
              user: tokenPayload,
              isVerified: true,
              token,
            });
          }
        );
      } else {
        next(createError(400, "Incorrect Password!"));
      }
    } else {
      next(createError(400, "No user found with this email"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await AuthModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

const getSingleUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await AuthModel.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
};

const updateOneUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  const { username, email } = req.body;

  // Get the token from the request header
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token's user ID matches the requested user ID
    if (decodedToken.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await AuthModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update relevant fields
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

const deleteOneUser = async (req, res, next) => {
  const userId = parseInt(req.params.id);

  // Get the token from the request header and remove "Bearer " prefix
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token's user ID matches the requested user ID
    if (decodedToken.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await AuthModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  postSignUp,
  postLogin,
  getAllUsers,
  getSingleUser,
  updateOneUser,
  deleteOneUser,
};
