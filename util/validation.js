const { body } = require("express-validator");

// Create the validation middleware
const createUserValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = createUserValidation;
