const { body } = require("express-validator");

const updateOneUserValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .optional(),
  body("email").isEmail().withMessage("Invalid email").optional(),
];

module.exports = updateOneUserValidation;
